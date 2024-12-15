<template>
  <div class="grid gap-2">
    <Label for="project">Project</Label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="isOpen"
          class="w-full justify-between"
        >
          {{ modelValue ? modelValue.name : "Select project..." }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="project in mockProjects"
                :key="project.id"
                :value="project"
                @select="() => {
                  $emit('update:modelValue', project)
                  isOpen = false
                }"
              >
                <Check
                  :class="[
                    'mr-2 h-4 w-4',
                    modelValue?.id === project.id ? 'opacity-100' : 'opacity-0'
                  ]"
                />
                {{ project.name }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { mockProjects } from '@/mock/project.mock'
import type { Project } from '@/interface/issus.interface'

defineProps<{
  modelValue: Project | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: Project): void
}>()

const open = ref(false)

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})
</script>
