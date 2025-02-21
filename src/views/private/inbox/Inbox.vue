<template>
  <div class="p-5">
    <div class="mb-5 flex space-x-2">
      <div class="relative w-full max-w-sm items-center">
        <Input
            id="search"
            type="text"
            v-model="searchQuery"
            placeholder="Search issues..."
            class="pl-10"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground"/>
      </span>
      </div>
      <AssigneeSelect :isLabel="false" v-model="assigneeFilter" label="" />
      <SprintSelect v-model="sprintCurrent" :isLabel="true" />
      <IssusCreate @create="handleIssueCreate"/>
    </div>
    <DefaultKanban
        v-if="!isLoading"
        :modelValue="issues"
        @update:modelValue="handleKanbanUpdate"
    />
    <DefaultLoading v-else/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

import {Input} from '@/components/ui/input'
import {Search} from 'lucide-vue-next'
import type {KanbanBoard, IssueInterface} from '@/interface/issus.interface'

import DefaultKanban from "@/components/kanban/DefaultKanban.vue";
import IssusCreate from "@/components/issus/IssusCreate.vue";
import AssigneeSelect from "@/components/issus/form/AssigneeSelect.vue";
import {getIssueCollection} from "@/services/api/issus.service.api.ts";
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";
import {kanbanBoardDataDefault} from "@/data/default/issues.data.default.ts";
import {getSprintCollection} from "@/services/api/sprint.service.api.ts";
import SprintSelect from "@/components/issus/form/SprintSelect.vue";
import {SprintInterface} from "@/interface/sprint.interface.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";

const searchQuery = ref<string>('');
const assigneeFilter = ref(JSON.parse(localStorage.getItem("userT") as string));
const isLoading = ref<boolean>(false)
const sprintCurrent = ref<SprintInterface>(defaultSprint)
const issues = ref<KanbanBoard>({
  backlog: [],
  planned: [],
  in_progress: [],
  completed: [],
  canceled: []
})

let originalKanbanData = <KanbanBoard>({...kanbanBoardDataDefault});

const loadIssues = async () => {
  try {
    isLoading.value = true

    const response = await getIssueCollection({
      sprint: sprintCurrent.value['@id'],
      owner: assigneeFilter.value ? `api/users/${assigneeFilter.value.id}` : undefined
    })

    const grouped: KanbanBoard = {
      backlog: [],
      planned: [],
      in_progress: [],
      completed: [],
      canceled: []
    }

    // Grouper les issues par status
    response.forEach(issue => {
      switch (issue.status) {
        case 'BACKLOG':
          grouped.backlog.push(issue)
          break
        case 'PLANNED':
          grouped.planned.push(issue)
          break
        case 'IN_PROGRESS':
          grouped.in_progress.push(issue)
          break
        case 'COMPLETED':
          grouped.completed.push(issue)
          break
        case 'CANCELED':
          grouped.canceled.push(issue)
          break
      }
    })
    issues.value = grouped
    originalKanbanData = {...grouped}
  } catch (error) {
    console.error('Error loading issues:', error)
  } finally {
    isLoading.value = false
  }
}

// Function to filter issues based on search query
const filterIssues = (issues: IssueInterface[], query: string): IssueInterface[] => {
  if (!query.trim()) return [...issues];
  const lowercaseQuery = query.toLowerCase().trim();
  return issues.filter(issue =>
      issue.name.toLowerCase().includes(lowercaseQuery) ||
      issue.reference.toLowerCase().includes(lowercaseQuery)
  );
};

// Handle updates from the kanban component
const handleKanbanUpdate = (newValue: KanbanBoard) => {
  // Only update original data if we're not filtering
  if (!searchQuery.value.trim()) {
    issues.value = {...newValue};
  }
};

const handleIssueCreate = (newIssue: IssueInterface) => {
  // Add the new issue to the appropriate column based on its status
  const status = newIssue.status as keyof KanbanBoard;
  originalKanbanData[status].push(newIssue);

  // Update the filtered view if we're not filtering
  if (!searchQuery.value.trim()) {
    issues.value[status].push({...newIssue});
  }
};

watch(searchQuery, (newValue) => {
  issues.value.backlog = filterIssues(originalKanbanData.backlog, newValue);
  issues.value.planned = filterIssues(originalKanbanData.planned, newValue);
  issues.value.in_progress = filterIssues(originalKanbanData.in_progress, newValue);
  issues.value.completed = filterIssues(originalKanbanData.completed, newValue);
  issues.value.canceled = filterIssues(originalKanbanData.canceled, newValue);
});

watch(assigneeFilter, async () => {
  await loadIssues()
});

onMounted(async () => {
  const sprint = await getSprintCollection({})
  sprintCurrent.value = sprint[0]
  await loadIssues()
})

watch(sprintCurrent, async () => {
  await loadIssues()
})
</script>
