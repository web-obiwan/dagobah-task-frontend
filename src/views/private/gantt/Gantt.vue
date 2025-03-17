<template>
  <div class="p-6 max-w-[87vw]">
    <div class="flex justify-between items-start w-full mb-5">
      <h1 class="text-2xl font-bold mb-6">Interactive Gantt Chart</h1>
      <div class="flex items-center gap-4">
        <SprintSelect v-if="useSprintData" v-model="sprintCurrent"/>
      </div>
    </div>

    <!-- Gantt Chart Container -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="flex justify-center items-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <ScrollArea v-else>
          <div ref="ganttContainer"></div>
        </ScrollArea>
      </CardContent>
    </Card>

    <!-- Tasks Table -->
    <Card>
      <CardHeader>
        <div class="flex justify-between items-center">
          <CardTitle>Task List</CardTitle>
          <div class="flex gap-2">
            <Button size="sm" variant="outline" @click="showAllTasks = !showAllTasks">
              {{ showAllTasks ? 'Hide Sub-tasks' : 'Show All Tasks' }}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="flex justify-center items-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Table v-else>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in showAllTasks ? tasks : topLevelTasks" :key="task.id">
              <TableCell class="font-medium">
                {{ task.name }}
                <span v-if="task.childs && task.childs.length > 0" class="ml-2 text-xs text-gray-500">
                  ({{ task.childs.length }} sub-tasks)
                </span>
              </TableCell>
              <TableCell>{{ task.project?.name || 'N/A' }}</TableCell>
              <TableCell>{{ getParentName(task) }}</TableCell>
              <TableCell>{{ formatDate(task.begunAt) }}</TableCell>
              <TableCell>{{ task.duration }} days</TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div :style="{ width: `${task.progress}%` }" class="bg-blue-600 h-2.5 rounded-full"></div>
                  </div>
                  <span class="text-xs">{{ task.progress }}%</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {SprintInterface} from "@/interface/sprint.interface.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";
import SprintSelect from "@/components/issus/form/SprintSelect.vue";

// Import shadcn components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ScrollArea} from "@/components/ui/scroll-area";
import type {GanttInterface} from "@/interface/gantt.interface.ts";
import {getGanttCollection} from "@/services/api/gantt.service.api.ts";

// Types for window.Gantt
declare global {
  interface Window {
    Gantt: any;
  }
}

// State
const ganttContainer = ref<HTMLElement | null>(null);
const ganttChart = ref<any>(null);
const tasks = ref<GanttInterface[]>([]);
const useSprintData = ref<boolean>(false);
const sprintCurrent = ref<SprintInterface>(defaultSprint);
const loading = ref<boolean>(false);
const showAllTasks = ref<boolean>(true);

// Computed properties
const topLevelTasks = computed(() => {
  return tasks.value.filter(task => !task.parent);
});

// Helper functions
const calculateEndDate = (startDate: string, durationDays: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationDays);
  return date.toISOString().slice(0, 10);
};

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
};

const getParentName = (task: GanttInterface): string => {
  if (!task.parent) return 'None';

  if (typeof task.parent === 'string') {
    const parentTask = tasks.value.find(t => t['@id'] === task.parent);
    return parentTask ? parentTask.name : 'Unknown';
  } else {
    return task.parent.name || 'Unknown';
  }
};

// Extend GanttInterface to include isParent flag
interface EnhancedGanttInterface extends GanttInterface {
  isParent?: boolean;
}

// Convert GanttInterface to the format expected by Frappe Gantt
const convertToGanttTask = (ganttItem: EnhancedGanttInterface) => {
  // Get parent ID if available
  let dependencies = undefined;
  if (ganttItem.parent) {
    // Check if parent is a string (reference) or an object
    const parentId = typeof ganttItem.parent === 'string'
        ? ganttItem.parent.split('/').pop()
        : ganttItem.parent.id?.toString();

    dependencies = parentId ? [parentId] : undefined;
  }

  // Format the date properly
  const formattedBegunAt = typeof ganttItem.begunAt === 'string'
      ? ganttItem.begunAt.split('T')[0] // Extract YYYY-MM-DD from ISO string
      : new Date(ganttItem.begunAt).toISOString().split('T')[0];

  // Prepare name with indentation for subtasks
  let displayName = ganttItem.name;
  if (ganttItem.parent) {
    // Add a prefix to visually indicate subtask
    displayName = `↳ ${displayName}`;
  }

  // Add count of children if any
  if (ganttItem.childs && ganttItem.childs.length > 0) {
    displayName = `${displayName} (${ganttItem.childs.length})`;
  }

  // Determine CSS class based on task hierarchy
  let customClass = 'regular-task';
  if (ganttItem.isParent) {
    customClass = 'parent-task';
  } else if (ganttItem.parent) {
    customClass = 'subtask';
  }

  return {
    id: ganttItem.id?.toString(),
    name: displayName,
    start: formattedBegunAt,
    duration: ganttItem.duration || 1, // Default to 1 day if duration is 0
    progress: ganttItem.progress / 100, // Frappe Gantt uses 0-1 range
    end: calculateEndDate(formattedBegunAt, ganttItem.duration || 1),
    dependencies,
    custom_class: customClass
  };
};

// Process tasks to handle parent-child relationships
const processTaskHierarchy = (tasks: GanttInterface[]): GanttInterface[] => {
  // Create a map for quick access to tasks by ID
  const taskMap = new Map<string, GanttInterface>();

  // First pass: populate the map
  tasks.forEach(task => {
    // Use @id as the key since it's unique
    taskMap.set(task['@id'], task);
  });

  // Second pass: resolve parent references and populate childs arrays
  tasks.forEach(task => {
    // Initialize childs array if not present
    if (!task.childs) {
      task.childs = [];
    }

    if (task.parent && typeof task.parent === 'string') {
      const parentTask = taskMap.get(task.parent);
      if (parentTask) {
        // Set parent reference
        task.parent = parentTask;

        // Add this task to parent's childs array
        if (!parentTask.childs) {
          parentTask.childs = [];
        }

        // Check if this child is already in the parent's childs array
        const alreadyInChilds = parentTask.childs.some(child => {
          return typeof child === 'object' && child['@id'] === task['@id'];
        });

        if (!alreadyInChilds) {
          parentTask.childs.push(task);
        }
      }
    }
  });

  // Calculate combined duration and update progress for parent tasks
  tasks.forEach(task => {
    if (task.childs && task.childs.length > 0) {
      updateParentTaskMetrics(task);
    }
  });

  return tasks;
};

// Update parent task metrics based on its children
const updateParentTaskMetrics = (parentTask: GanttInterface) => {
  if (!parentTask.childs || parentTask.childs.length === 0) return;

  // Find earliest start date and latest end date among children
  let earliestStart: Date | null = null;
  let latestEnd: Date | null = null;
  let totalProgress = 0;

  parentTask.childs.forEach(child => {
    if (typeof child === 'object') {
      // Get start date
      const childStart = new Date(child.begunAt);
      if (!earliestStart || childStart < earliestStart) {
        earliestStart = childStart;
      }

      // Calculate end date
      const childEnd = new Date(child.begunAt);
      childEnd.setDate(childEnd.getDate() + (child.duration || 0));
      if (!latestEnd || childEnd > latestEnd) {
        latestEnd = childEnd;
      }

      // Sum progress
      totalProgress += child.progress || 0;
    }
  });

  // Update parent task if we have valid dates
  if (earliestStart && latestEnd) {
    // Set parent start date to earliest child start date
    parentTask.begunAt = earliestStart.toISOString();

    // Calculate duration as difference between earliest start and latest end
    const diffTime = Math.abs(latestEnd.getTime() - earliestStart.getTime());
    parentTask.duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Average progress across all children
    parentTask.progress = Math.round(totalProgress / parentTask.childs.length);
  }
};

// API Integration
const fetchGanttData = async () => {
  try {
    loading.value = true;
    const data = await getGanttCollection({});
    tasks.value = processTaskHierarchy(data);
    updateGantt();
  } catch (error) {
    console.error('Error fetching Gantt data:', error);
  } finally {
    loading.value = false;
  }
};

const updateGantt = () => {
  if (!ganttContainer.value) return;

  if (ganttChart.value) {
    // Convert GanttInterface to Frappe Gantt format
    const ganttTasks = tasks.value.map(convertToGanttTask);
    ganttChart.value.refresh(ganttTasks);
  } else {
    initGantt();
  }
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

// Sort tasks to ensure parents come before children
const sortTasksHierarchically = (tasks: GanttInterface[]): GanttInterface[] => {
  // Create a map to store the depth of each task
  const depthMap = new Map<string, number>();

  // Calculate depth for each task
  const calculateDepth = (task: GanttInterface): number => {
    // Check if depth is already calculated
    if (depthMap.has(task['@id'])) {
      return depthMap.get(task['@id']) || 0;
    }

    // If no parent, depth is 0
    if (!task.parent) {
      depthMap.set(task['@id'], 0);
      return 0;
    }

    // Get parent task
    const parentId = typeof task.parent === 'string' ? task.parent : task.parent['@id'];
    const parentTask = tasks.find(t => t['@id'] === parentId);

    if (!parentTask) {
      depthMap.set(task['@id'], 0);
      return 0;
    }

    // Calculate parent depth and add 1
    const depth = calculateDepth(parentTask) + 1;
    depthMap.set(task['@id'], depth);
    return depth;
  };

  // Calculate depth for all tasks
  tasks.forEach(task => calculateDepth(task));

  // Sort by depth (ascending)
  return [...tasks].sort((a, b) => {
    const depthA = depthMap.get(a['@id']) || 0;
    const depthB = depthMap.get(b['@id']) || 0;
    return depthA - depthB;
  });
};

// Initialize Gantt chart
const initGantt = () => {
  if (!ganttContainer.value || tasks.value.length === 0 || !window.Gantt) return;

  // Sort tasks hierarchically
  tasks.value = sortTasksHierarchically(tasks.value);

  // Convert GanttInterface to Frappe Gantt format
  // Process tasks into hierarchical format for Gantt
  const parentTaskMap = new Map<string, boolean>();

  // Mark all parent tasks
  tasks.value.forEach(task => {
    if (task.childs && task.childs.length > 0) {
      parentTaskMap.set(task['@id'], true);
    }
  });

  // Convert tasks to Gantt format
  const ganttTasks = tasks.value.map(task => {
    const isParent = parentTaskMap.has(task['@id']);
    return convertToGanttTask({...task, isParent});
  });

  ganttChart.value = new window.Gantt(ganttContainer.value, ganttTasks, {
    header_height: 50,
    column_width: 30,
    step: 24,
    view_modes: ['Day', 'Week', 'Month'],
    bar_height: 20,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    view_mode: 'Week', // Default to Week view for better visibility
    date_format: 'YYYY-MM-DD',
    language: 'en',
    // Group tasks automatically based on parent-child relationships
    auto_schedule: true,
    // Hierarchy behavior
    dependencies_enabled: true,
    on_click: (task: any) => {
      // Find the original task
      const originalTask = tasks.value.find(t => t.id?.toString() === task.id);
      if (originalTask) {
        alert(`Task: ${originalTask.name}\nProject: ${originalTask.project?.name || 'N/A'}\nDuration: ${originalTask.duration} days\nProgress: ${originalTask.progress}%`);
      }
    },
    on_date_change: (task: any, start: Date, end: Date) => {
      // Use this to handle date changes when implementing your own update logic
      console.log('Date changed:', task, start, end);

      // Calculate new duration
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log('New duration:', diffDays);
      // Implement your own update logic here
    },
    on_progress_change: (task: any, progress: number) => {
      // Use this to handle progress changes when implementing your own update logic
      console.log('Progress changed:', task, progress);

      // Convert progress from 0-1 to 0-100
      const progressPercent = Math.round(progress * 100);
      console.log('New progress:', progressPercent);
      // Implement your own update logic here
    }
  });
};

// Lifecycle hooks
onMounted(async () => {
  await loadFrappeGantt();
  await fetchGanttData();
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

// Watch for changes in sprintCurrent to fetch filtered data
watch(sprintCurrent, async () => {
  if (useSprintData && sprintCurrent.value && sprintCurrent.value.id) {
    try {
      loading.value = true;
      const data = await getGanttCollection({sprint: sprintCurrent.value.id});
      tasks.value = processTaskHierarchy(data);
      updateGantt();
    } catch (error) {
      console.error('Error fetching Gantt data for sprint:', error);
    } finally {
      loading.value = false;
    }
  }
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

/* Custom styling for parent tasks and subtasks */
.gantt .bar.parent-task {
  fill: #7c3aed;
  stroke: #6d28d9;
}

.gantt .bar-progress.parent-task {
  fill: #5b21b6;
}

.gantt .bar.subtask {
  fill: #a5b4fc;
  stroke: #818cf8;
}

.gantt .bar-progress.subtask {
  fill: #4f46e5;
}

/* Indentation for subtask names */
.gantt .bar-label.subtask {
  font-size: 12px;
  fill: #4b5563;
}
</style>
