<template>
  <div class="p-6 max-w-[87vw]">
    <div class="flex justify-between items-start w-full mb-5">
      <h1 class="text-2xl font-bold mb-6">Interactive Gantt Chart</h1>
      <div class="flex items-center gap-4">
        <SprintSelect v-if="useSprintData" v-model="sprintCurrent"/>
        <div class="flex items-center gap-2 mr-4">
          <Button
              variant="default"
              @click="toggleDataSource"
          >
          Using API Data
          </Button>
        </div>
        <GanttTaskDialog
            :project="project"
            :repositories="repositories"
            @task-added="addNewTask"
        />
      </div>
    </div>

    <!-- Gantt Chart Container -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div ref="ganttContainer"></div>
        </ScrollArea>
      </CardContent>
    </Card>

    <!-- Tasks Table -->
    <GanttTaskTable
        :formatDate="formatDate"
        :tasks="tasksData"
        @remove-task="removeTask"
    />
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {SprintInterface} from "@/interface/sprint.interface.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";
import SprintSelect from "@/components/issus/form/SprintSelect.vue";

// Import shadcn components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import type {ProjectInterface} from "@/interface/project.interface.ts";
import type {RepositoryInterface} from "@/interface/repository.interface.ts";
import {defaultProject} from "@/data/default/project.data.default.ts";

// Import custom components
import GanttTaskDialog from "@/views/private/gantt/components/GanttTaskDialog.vue";
import GanttTaskTable from "@/views/private/gantt/components/GanttTaskTable.vue";

// Import types and utilities
import {GanttInterface, Task} from "@/interface/gantt.interface.ts";
import {calculateEndDate, formatDate} from "@/utils/date.utils.ts";
import {loadFrappeGantt} from "@/views/private/gantt/logic/loader.gantt.logic.ts";
import {generateTaskId} from "@/views/private/gantt/logic/id-generator.gantt.logic.ts";
import {getGanttCollection} from "@/services/api/gantt.service.api.ts";
import {ganttDataDefault} from "@/data/default/gantt.data.default.ts";
import {catchUtils} from "@/utils/catch.utils.ts";

// Types for window.Gantt
declare global {
  interface Window {
    Gantt: any;
  }
}

// State
const ganttContainer = ref<HTMLElement | null>(null);
const ganttChart = ref<any>(null);
const tasks = ref<Task[]>([]);
const tasksData = ref<GanttInterface[]>([ganttDataDefault]);
const apiTasks = ref<Task[]>([]);
const useSprintData = ref<boolean>(false);
const sprintCurrent = ref<SprintInterface>(defaultSprint);
const project = ref<ProjectInterface>(defaultProject);
const repositories = ref<RepositoryInterface[]>();

// Toggle between test data and API data
const toggleDataSource = () => {
    // Use API data
    tasks.value = apiTasks.value;
    console.log('Switched to API data:', tasks.value);
};

// Task management
const addNewTask = (newTaskData: Partial<Task>) => {
  if (!newTaskData.name || !newTaskData.start || !newTaskData.duration) return;

  const taskToAdd: Task = {
    id: generateTaskId(),
    name: newTaskData.name,
    start: newTaskData.start,
    duration: newTaskData.duration,
    end: calculateEndDate(newTaskData.start, newTaskData.duration),
    progress: 0
  };

  tasks.value.push(taskToAdd);
  updateGantt();
};

const removeTask = (index: number) => {
  tasks.value.splice(index, 1);
  updateGantt();
};

const updateGantt = () => {
  if (!ganttContainer.value) return;

  if (ganttChart.value) {
    ganttChart.value.refresh(tasks.value);
  } else {
    initGantt();
  }
};

// Initialize with example data
const loadExampleTasks = () => {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().slice(0, 10);

  tasks.value = [
    {
      id: 'task_1',
      name: 'Design phase',
      start: todayStr,
      duration: 5,
      progress: 20
    },
    {
      id: 'task_2',
      name: 'Development kickoff',
      start: tomorrowStr,
      duration: 3,
      progress: 0,
      dependencies: ['task_1']
    },
    {
      id: 'task_3',
      name: 'Testing',
      start: nextWeekStr,
      duration: 5,
      progress: 0,
      dependencies: ['task_2']
    }
  ];
};

const getGanttData = async () => {
  try {
    tasksData.value = await getGanttCollection({});
  } catch (error) {
   // catchUtils(error);
    console.error('error', error)
  }
}

// Initialize Gantt chart
const initGantt = async() => {
  if (!ganttContainer.value || tasksData.value.length === 0 || !window.Gantt) return;

  // Calculate end dates for each task for the gantt library
  const ganttTasks = tasksData.value.map(task => ({
    ...task,
    dependencies: [task.parent ? task.parent.id : null],
    end: calculateEndDate(task.begunAt, task.duration)
  }));

  ganttChart.value = new window.Gantt(ganttContainer.value, ganttTasks, {
    header_height: 50,
    column_width: 30,
    step: 24,
    view_modes: ['Day', 'Week', 'Month'],
    bar_height: 20,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    view_mode: 'Day',
    date_format: 'YYYY-MM-DD',
    language: 'en',
    on_click: (task: GanttInterface) => {
      alert(`Task: ${task.name}\nDuration: ${task.duration} days`);
    },
    on_date_change: (task: GanttInterface, start: Date, end: Date) => {
      // Update the task in our data
      const taskIndex = tasksData.value.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasksData.value[taskIndex].begunAt = start.toISOString().slice(0, 10);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        tasksData.value[taskIndex].duration = diffDays;
      }
    },
    on_progress_change: (task: GanttInterface, progress: number) => {
      // Update the task progress in our data
      const taskIndex = tasksData.value.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasksData.value[taskIndex].progress = progress;
      }
    }
  });
};

// Lifecycle hooks
onMounted(async () => {
  await loadFrappeGantt();
  await getGanttData();
  await initGantt();

  console.log("tasks.value", tasks.value)
  console.log("tasksData.value", tasksData.value)

});

onBeforeUnmount(() => {
  if (ganttChart.value) {
    ganttChart.value = null;
  }
  window.removeEventListener('resize', updateGantt);
});

// Watch for window resize to redraw the chart
window.addEventListener('resize', updateGantt);
</script>
