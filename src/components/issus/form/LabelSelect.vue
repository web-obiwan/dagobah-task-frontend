<template>
  <div class="grid gap-2">
    <Label for="labels">Labels</Label>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="min-w-[150px]">
          <div v-if="selectedLabels.length" class="flex flex-wrap gap-1">
            <span
                v-for="label in selectedLabels.slice(0, 2)"
                :key="label.id"
                class="rounded px-1 text-xs"
                :class="getLabelStyle(label.name)"
            >
              {{ label.name }}
            </span>
            <span v-if="selectedLabels.length > 2" class="text-xs text-muted-foreground">
              +{{ selectedLabels.length - 2 }}
            </span>
          </div>
          <span v-else class="text-muted-foreground">Select labels</span>
          <ChevronDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Labels</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea class="h-[300px]">
          <DropdownMenuCheckboxItem
              v-for="label in availableLabels"
              :key="label.id"
              :checked="selectedLabels.some(selected => selected.id === label.id)"
              @select="toggleLabel(label)"
              class="flex items-center"
          >
            <div class="flex-1 flex items-center">
              <span
                  class="ml-2 rounded px-1.5 py-0.5 text-xs"
                  :class="getLabelStyle(label.name)"
              >
                {{ label.name }}
              </span>
            </div>
          </DropdownMenuCheckboxItem>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { getLabelStyle } from '@/utils/transformer/label.transformer.utils'
import { ChevronDown } from 'lucide-vue-next'
import type { LabelInterface } from '@/interface/label.interface'
import { getLabelCollection } from '@/services/api/label.service.api'

const props = defineProps<{
  modelValue: LabelInterface[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: LabelInterface[]): void
}>()

const availableLabels = ref<LabelInterface[]>([])
const isLoading = ref(true)

const selectedLabels = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
})

const toggleLabel = (label: LabelInterface) => {
  const newSelection = [...selectedLabels.value]
  const index = newSelection.findIndex(selected => selected.id === label.id)

  if (index === -1) {
    newSelection.push(label)
  } else {
    newSelection.splice(index, 1)
  }

  emit('update:modelValue', newSelection)
}

onMounted(async () => {
  try {
    availableLabels.value = await getLabelCollection()
  } catch (error) {
    console.error('Error fetching labels:', error)
  } finally {
    isLoading.value = false
  }
})
</script>