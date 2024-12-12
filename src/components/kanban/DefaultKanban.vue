<template>
  <div class="grid grid-cols-5 gap-4 py-10 h-full mx-5">
    <div
        v-for="(items, status) in data"
        :key="status"
        class="col-span-1"
    >
      <DefaultColKanban
          v-model:data="data[status]"
          :issuStatus="status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import DefaultColKanban from "@/components/kanban/sub-composents/DefaultColKanban.vue";

const data = ref({
  backlog: [
    { name: "Task 1", id: 1 },
    { name: "Task 2", id: 2 },
    { name: "Task 3", id: 3 },
  ],
  planned: [
    { name: "Task 4", id: 4 },
    { name: "Task 5", id: 5 },
  ],
  inProgress: [
    { name: "Task 6", id: 6 },
    { name: "Task 7", id: 7 },
  ],
  completed: [
    { name: "Task 8", id: 8 },
  ],
  canceled: [
    { name: "Task 9", id: 9 },
  ],
});
</script>
