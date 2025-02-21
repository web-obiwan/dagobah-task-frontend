<template>
  <div class="grid gap-2">
    <Label for="sprint" v-if="!isLabel" >Sprint</Label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
            variant="outline"
            role="combobox"
            :aria-expanded="isOpen"
            class="w-full justify-between"
        >
          {{ modelValue ? modelValue.name : "Select sprint..." }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search sprint..." />
          <CommandEmpty>No sprint found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                  v-for="sprint in sprints"
                  :key="sprint.id"
                  :value="sprint"
                  @select="() => {
                  $emit('update:modelValue', sprint)
                  isOpen = false
                }"
              >
                <div class="flex items-center gap-2">
                  <span>{{ sprint.name }}</span>
                  <span class="text-xs text-muted-foreground">
                    {{ formatDate(sprint.begunAt) }} - {{ formatDate(sprint.endedAt) }}
                  </span>
                </div>
                <Check
                    :class="[
                    'ml-auto h-4 w-4',
                    modelValue?.id === sprint.id ? 'opacity-100' : 'opacity-0'
                  ]"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import type { SprintInterface } from '@/interface/sprint.interface'
import { getSprintCollection } from '@/services/api/sprint.service.api'

defineProps<{
  modelValue: SprintInterface | null
  isLabel?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: SprintInterface): void
}>()

const open = ref(false)
const sprints = ref<SprintInterface[]>([])
const isLoading = ref(true)

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  try {
    sprints.value = await getSprintCollection({})
  } catch (error) {
    console.error('Error fetching sprints:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
