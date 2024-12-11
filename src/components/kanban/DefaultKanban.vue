<template>
  <div class="grid grid-cols-5 gap-4 py-10">
    <!-- Backlog Column -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-4">Backlog</h3>
      <draggable
          v-model="backlog"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Planned Column -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-4">Planned</h3>
      <draggable
          v-model="planned"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <!-- In Progress Column -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-4">In Progress</h3>
      <draggable
          v-model="inProgress"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Completed Column -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-4">Completed</h3>
      <draggable
          v-model="completed"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Canceled Column -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-4">Canceled</h3>
      <draggable
          v-model="canceled"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import draggable from "vuedraggable";

const backlog = ref([
  { name: "Task 1", id: 1 },
  { name: "Task 2", id: 2 },
  { name: "Task 3", id: 3 },
]);

const planned = ref([
  { name: "Task 4", id: 4 },
  { name: "Task 5", id: 5 },
]);

const inProgress = ref([
  { name: "Task 6", id: 6 },
  { name: "Task 7", id: 7 },
]);

const completed = ref([
  { name: "Task 8", id: 8 },
]);

const canceled = ref([
  { name: "Task 9", id: 9 },
]);
</script>
