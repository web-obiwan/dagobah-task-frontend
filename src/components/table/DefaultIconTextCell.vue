<template>
  <div class="flex space-x-2 items-center">
    <component :is="data.icon" class="h-4 w-4" :class="data.color"/>
    <p>{{ data.name }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: any
}>();
</script>
