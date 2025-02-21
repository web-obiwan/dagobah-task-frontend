<template>
  <div class="p-6 max-w-[87vw]">
    <div class="flex justify-between items-start w-full mb-5">
      <h1 class="text-2xl font-bold mb-6">Interactive Gantt Chart</h1>
      <SprintSelect v-if="useSprintData" v-model="sprintCurrent"/>
    </div>

    <!-- Task Addition Form -->
    <Card class="mb-6">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="addNewTask">
          <div class="space-y-2">
            <Label for="task-name">Task Name</Label>
            <Input id="task-name" v-model="newTask.name" required/>
          </div>
          <div class="space-y-2">
            <Label for="start-date">Start Date</Label>
            <Input id="start-date" v-model="newTask.start" required type="date"/>
          </div>
          <div class="space-y-2">
            <Label for="duration">Duration (days)</Label>
            <Input id="duration" v-model.number="newTask.duration" min="1" required type="number"/>
          </div>
          <ProjectSelect v-model="project" />
          <RepositorySelect v-model="project" />
          <div class="md:col-span-3">
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </CardContent>
    </Card>

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
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(task, index) in tasks" :key="index">
              <TableCell class="font-medium">{{ task.name }}</TableCell>
              <TableCell>{{ formatDate(task.start) }}</TableCell>
              <TableCell>{{ task.duration }} days</TableCell>
              <TableCell>
                <Button size="sm" variant="destructive" @click="removeTask(index)">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {SprintInterface} from "@/interface/sprint.interface.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";
import SprintSelect from "@/components/issus/form/SprintSelect.vue";

// Import shadcn components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import ProjectSelect from "@/components/issus/form/ProjectSelect.vue";
import type {ProjectInterface} from "@/interface/project.interface.ts";
import RepositorySelect from "@/components/issus/form/RepositorySelect.vue";
import type {RepositoryInterface} from "@/interface/repository.interface.ts";
import {ScrollArea} from "@/components/ui/scroll-area";

// Interfaces
interface Task {
  id: string;
  name: string;
  start: string; // ISO format date string
  end?: string;  // ISO format date string (calculated from duration)
  duration: number;
  progress?: number;
  dependencies?: string[];
}

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
const project = ref<ProjectInterface>()
const repositories = ref<RepositoryInterface[]>()

// New task form
const newTask = ref<Partial<Task>>({
  name: '',
  start: new Date().toISOString().slice(0, 10),
  duration: 5
});

// Helper functions
const calculateEndDate = (startDate: string, durationDays: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationDays);
  return date.toISOString().slice(0, 10);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
};

const generateTaskId = (): string => {
  return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
};

// Task management
const addNewTask = () => {
  if (!newTask.value.name || !newTask.value.start || !newTask.value.duration) return;

  const taskToAdd: Task = {
    id: generateTaskId(),
    name: newTask.value.name,
    start: newTask.value.start,
    duration: newTask.value.duration,
    end: calculateEndDate(newTask.value.start, newTask.value.duration),
    progress: 0
  };

  tasks.value.push(taskToAdd);

  // Reset form
  newTask.value = {
    name: '',
    start: new Date().toISOString().slice(0, 10),
    duration: 5
  };

  // Update gantt chart
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

// Load Frappe Gantt from CDN
const loadFrappeGantt = async () => {
  return new Promise<void>((resolve) => {
    // Load CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdn.jsdelivr.net/npm/frappe-gantt@0.6.1/dist/frappe-gantt.css';
    document.head.appendChild(linkElement);

    // Load JS
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://cdn.jsdelivr.net/npm/frappe-gantt@0.6.1/dist/frappe-gantt.min.js';
    scriptElement.onload = () => {
      resolve();
    };
    document.head.appendChild(scriptElement);
  });
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
});

// Watch for window resize to redraw the chart
window.addEventListener('resize', updateGantt);
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGantt);
});
</script>

<style>
.gantt-chart-container {
  height: 400px;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

/* Custom styling to match your app */
.gantt .bar-progress {
  fill: #3b82f6;
}

.gantt .bar {
  fill: #93c5fd;
  stroke: #60a5fa;
}

.gantt .bar-label {
  fill: #1e3a8a;
  font-weight: 500;
}

.gantt .grid-header {
  fill: #f1f5f9;
  stroke: #e2e8f0;
}

.gantt .grid-row {
  fill: #ffffff;
}

.gantt .row-line {
  stroke: #e2e8f0;
}

.gantt .tick {
  stroke: #cbd5e1;
}

.gantt .today-highlight {
  fill: #fef3c7;
  opacity: 0.5;
}

/* Ensure Gantt stays within bounds */
.gantt svg {
  max-width: 100%;
}
</style>
