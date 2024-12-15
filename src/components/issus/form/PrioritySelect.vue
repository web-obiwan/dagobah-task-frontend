<template>
  <div class="grid gap-2">
    <Label for="priority">Priority</Label>
    <Select :value="modelValue" @update:value="$emit('update:modelValue', $event)">
      <SelectTrigger>
        <SelectValue placeholder="Select priority">
          <div v-if="modelValue" class="flex items-center gap-2">
            <component :is="getPriorityIcon(modelValue)" class="h-4 w-4" :class="getPriorityColor(modelValue)" />
            {{ modelValue.charAt(0).toUpperCase() + modelValue.slice(1) }}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="low">
          <div class="flex items-center gap-2">
            <ArrowDown class="h-4 w-4 text-blue-500" />
            Low
          </div>
        </SelectItem>
        <SelectItem value="medium">
          <div class="flex items-center gap-2">
            <ArrowRight class="h-4 w-4 text-yellow-500" />
            Medium
          </div>
        </SelectItem>
        <SelectItem value="high">
          <div class="flex items-center gap-2">
            <ArrowUp class="h-4 w-4 text-red-500" />
            High
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
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-vue-next'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return ArrowUp
    case 'medium':
      return ArrowRight
    case 'low':
      return ArrowDown
    default:
      return ArrowRight
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-yellow-500'
    case 'low':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}
</script>
