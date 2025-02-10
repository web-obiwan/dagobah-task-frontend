<template>
  <div class="grid gap-2">
    <Label for="status">Status</Label>
    <Select v-model="localValue">
      <SelectTrigger>
        <SelectValue placeholder="Select status">
          <div v-if="localValue" class="flex items-center gap-2">
            <component
                :is="issusStatusTransformer(localValue).icon"
                class="h-4 w-4"
                :class="issusStatusTransformer(localValue).color"
            />
            {{ issusStatusTransformer(localValue).name }}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
            v-for="status in statusOptions"
            :key="status"
            :value="status"
        >
          <div class="flex items-center gap-2">
            <component
                :is="issusStatusTransformer(status).icon"
                class="h-4 w-4"
                :class="issusStatusTransformer(status).color"
            />
            {{ issusStatusTransformer(status).name }}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { issusStatusTransformer } from '@/utils/transformer/status.transformer.utils'
import type { IssuesStatus } from '@/interface/issus.interface'

const props = defineProps<{
  modelValue: IssuesStatus
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IssuesStatus): void
}>()

const localValue = ref<IssuesStatus>(props.modelValue)

const statusOptions: IssuesStatus[] = [
  'BACKLOG',
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELED'
]

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>