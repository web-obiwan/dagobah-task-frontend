<template>
  <div class="grid grid-cols-5 gap-4 h-full">
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
import {ref, watch} from 'vue'
import DefaultColKanban from "@/components/kanban/sub-composents/DefaultColKanban.vue";

const props = defineProps<{
  modelValue: {
    backlog: Array<{ name: string; id: number }>;
    planned: Array<{ name: string; id: number }>;
    inProgress: Array<{ name: string; id: number }>;
    completed: Array<{ name: string; id: number }>;
    canceled: Array<{ name: string; id: number }>;
  }
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>();

const data = ref(props.modelValue);

// Watch for changes in the data and emit updates
watch(data, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>
