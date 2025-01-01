<template>
  <div class="grid gap-2">
    <Label for="status">Status</Label>
    <Select :value="modelValue" @update:value="$emit('update:modelValue', $event)">
      <SelectTrigger>
        <SelectValue placeholder="Select status">
          <div v-if="modelValue" class="flex items-center gap-2">
            <component :is="issusStatusTransformer(modelValue).icon" class="h-4 w-4" :class="issusStatusTransformer(modelValue).color" />
            {{ modelValue.charAt(0).toUpperCase() + modelValue.slice(1) }}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="backlog">
          <div class="flex items-center gap-2">
            <component :is="issusStatusTransformer('backlog').icon" class="h-4 w-4" :class="issusStatusTransformer('backlog').color" />
            Backlog
          </div>
        </SelectItem>
        <SelectItem value="planned">
          <div class="flex items-center gap-2">
            <component :is="issusStatusTransformer('planned').icon" class="h-4 w-4" :class="issusStatusTransformer('planned').color" />
            Planned
          </div>
        </SelectItem>
        <SelectItem value="inProgress">
          <div class="flex items-center gap-2">
            <component :is="issusStatusTransformer('inProgress').icon" class="h-4 w-4" :class="issusStatusTransformer('inProgress').color" />
            In Progress
          </div>
        </SelectItem>
        <SelectItem value="completed">
          <div class="flex items-center gap-2">
            <component :is="issusStatusTransformer('completed').icon" class="h-4 w-4" :class="issusStatusTransformer('completed').color" />
            Completed
          </div>
        </SelectItem>
        <SelectItem value="canceled">
          <div class="flex items-center gap-2">
            <component :is="issusStatusTransformer('canceled').icon" class="h-4 w-4" :class="issusStatusTransformer('canceled').color" />
            Canceled
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  modelValue: IssuesStatus
}>()

defineEmits<{
  (e: 'update:modelValue', value: IssuesStatus): void
}>()
</script>
