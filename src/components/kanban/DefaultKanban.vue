<template>
  <div class="grid grid-cols-5 gap-4 h-full">
    <div
        v-for="(_, status) in data"
        :key="status"
        class="col-span-1"
    >
      <DefaultColKanban
          v-model:data="data[status]"
          :issuStatus="status.toUpperCase() as IssuesStatus"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import DefaultColKanban from "@/components/kanban/sub-composents/DefaultColKanban.vue";
import {IssueInterface, IssuesStatus} from "@/interface/issus.interface.ts";

const props = defineProps<{
  modelValue: {
    backlog: IssueInterface[];
    planned: IssueInterface[];
    in_progress: IssueInterface[];
    completed: IssueInterface[];
    canceled: IssueInterface[];
  }
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>();

const data = ref(props.modelValue);

watch(data, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>
