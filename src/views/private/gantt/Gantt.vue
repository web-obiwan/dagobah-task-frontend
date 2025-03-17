<template>
  <div class="p-6 max-w-[87vw]">
    <div class="flex justify-between items-start w-full mb-5">
      <h1 class="text-2xl font-bold mb-6">Interactive Gantt Chart</h1>
      <div class="flex items-center gap-4">
        <SprintSelect v-if="useSprintData" v-model="sprintCurrent"/>
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
        :tasks="tasks"
        :formatDate="formatDate"
        @remove-task="removeTask"
    />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { SprintInterface } from "@/interface/sprint.interface.ts";
import { defaultSprint } from "@/data/default/sprint.data.default.ts";
import SprintSelect from "@/components/issus/form/SprintSelect.vue";

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ProjectInterface } from "@/interface/project.interface.ts";
import type { RepositoryInterface } from "@/interface/repository.interface.ts";
import { defaultProject } from "@/data/default/project.data.default.ts";

// Import custom components
import GanttTaskDialog from "@/components/gantt/GanttTaskDialog.vue";
import GanttTaskTable from "@/components/gantt/GanttTaskTable.vue";

// Import types and utilities
import { Task } from "@/types/gantt.types";
import { calculateEndDate, formatDate } from "@/utils/date-utils";
import { loadFrappeGantt } from "@/utils/gantt-loader";
import { generateTaskId } from "@/utils/id-generator";

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
const useSprintData = ref<boolean>(false);
const sprintCurrent = ref<SprintInterface>(defaultSprint);
const project = ref<ProjectInterface>(defaultProject);
const repositories = ref<RepositoryInterface[]>();

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

// Initialize Gantt chart
const initGantt = () => {
  if (!ganttContainer.value || tasks.value.length === 0 || !window.Gantt) return;

  // Calculate end dates for each task for the gantt library
  const ganttTasks = tasks.value.map(task => ({
    ...task,
    end: task.end || calculateEndDate(task.start, task.duration)
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
    on_click: (task: Task) => {
      alert(`Task: ${task.name}\nDuration: ${task.duration} days`);
    },
    on_date_change: (task: Task, start: Date, end: Date) => {
      // Update the task in our data
      const taskIndex = tasks.value.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasks.value[taskIndex].start = start.toISOString().slice(0, 10);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        tasks.value[taskIndex].duration = diffDays;
      }
    },
    on_progress_change: (task: Task, progress: number) => {
      // Update the task progress in our data
      const taskIndex = tasks.value.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasks.value[taskIndex].progress = progress;
      }
    }
  });
};

// Lifecycle hooks
onMounted(async () => {
  await loadFrappeGantt();
  loadExampleTasks();
  nextTick(() => {
    initGantt();
  });
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

<style>
@import '@/styles/gantt.css';
</style>
