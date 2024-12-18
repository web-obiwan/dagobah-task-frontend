<template>
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
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <DefaultFilterBtn />
    <IssusCreate @create="handleIssueCreate" />
  </div>
  <DefaultKanban 
    :modelValue="kanbanData" 
    @update:modelValue="handleKanbanUpdate"
  />
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import type { KanbanBoard, Issus } from '@/interface/issus.interface'
import { mockIssusData } from '@/mock/issus.mock'

import DefaultKanban from "@/components/kanban/DefaultKanban.vue";
import IssusCreate from "@/components/issus/IssusCreate.vue";
import DefaultFilterBtn from "@/components/filter/DefaultFilterBtn.vue";

const searchQuery = ref('');

// Original unfiltered data
const originalKanbanData = <KanbanBoard>{ ...mockIssusData };
const kanbanData = ref<KanbanBoard>({ ...originalKanbanData });

// Function to filter issues based on search query
const filterIssues = (issues: Issus[], query: string): Issus[] => {
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
    kanbanData.value = { ...newValue };
  }
};

const handleIssueCreate = (newIssue: Issus) => {
  // Add the new issue to the appropriate column based on its status
  const status = newIssue.status as keyof KanbanBoard;
  originalKanbanData[status].push(newIssue);
  
  // Update the filtered view if we're not filtering
  if (!searchQuery.value.trim()) {
    kanbanData.value[status].push({ ...newIssue });
  }
};

// Debug watcher
watch(searchQuery, (newValue) => {
  kanbanData.value.backlog = filterIssues(originalKanbanData.backlog, newValue);
  kanbanData.value.planned = filterIssues(originalKanbanData.planned, newValue);
  kanbanData.value.inProgress = filterIssues(originalKanbanData.inProgress, newValue);
  kanbanData.value.completed = filterIssues(originalKanbanData.completed, newValue);
  kanbanData.value.canceled = filterIssues(originalKanbanData.canceled, newValue);
});
</script>
