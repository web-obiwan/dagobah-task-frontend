<template>
  <div class="grid gap-2">
    <Label for="priority">Priority</Label>
    <Select
        :model-value="localValue?.name ?? ''"
        @update:model-value="handleValueChange"
    >
      <SelectTrigger>
        <SelectValue placeholder="Select priority">
          <div v-if="localValue" class="flex items-center gap-2">
            <component
                :is="issuesPriorityTransformer(localValue.name).icon"
                class="h-4 w-4"
                :class="issuesPriorityTransformer(localValue.name).color"
            />
            {{ issuesPriorityTransformer(localValue.name).name }}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <template v-if="!isLoading">
          <SelectItem
              v-for="priority in priorities"
              :key="priority.id"
              :value="priority.name"
          >
            <div class="flex items-center gap-2">
              <component
                  :is="issuesPriorityTransformer(priority.name).icon"
                  class="h-4 w-4"
                  :class="issuesPriorityTransformer(priority.name).color"
              />
              {{ issuesPriorityTransformer(priority.name).name }}
            </div>
          </SelectItem>
        </template>
        <DefaultLoading v-else />
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { issuesPriorityTransformer } from '@/utils/transformer/priority.transformer.utils'
import DefaultLoading from '@/components/ui/loading/DefaultLoading.vue'
import { getPriorityCollection } from '@/services/api/priority.service.api'
import { PriorityInterface } from "@/interface/priority.interface"

const props = defineProps<{
  modelValue: PriorityInterface | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PriorityInterface): void
}>()

const localValue = ref<PriorityInterface | null>(props.modelValue)
const priorities = ref<PriorityInterface[]>([])
const isLoading = ref(true)

const handleValueChange = (value: string) => {
  const selectedPriority = priorities.value.find(p => p.name === value)
  if (selectedPriority) {
    localValue.value = selectedPriority
    emit('update:modelValue', selectedPriority)
  }
}

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

onMounted(async () => {
  try {
    priorities.value = await getPriorityCollection()
  } catch (error) {
    console.error('Error fetching priorities:', error)
    priorities.value = []
  } finally {
    isLoading.value = false
  }
})
</script>