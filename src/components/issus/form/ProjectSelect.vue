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
              <template v-if="!isLoading">
                <CommandItem
                    v-for="project in projects"
                    :key="project.id"
                    :value="project"
                    @select="handleSelect(project)"
                >
                  <Check
                      :class="[
                      'mr-2 h-4 w-4',
                      modelValue?.id === project.id ? 'opacity-100' : 'opacity-0'
                    ]"
                  />
                  {{ project.name }}
                </CommandItem>
              </template>
              <DefaultLoading v-else />
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
import { getProjectCollection } from "@/services/api/project.service.api"
import type { ProjectInterface } from "@/interface/project.interface"
import { defaultProject } from "@/data/default/project.data.default"
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue"

defineProps<{
  modelValue: ProjectInterface | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProjectInterface): void
}>()

const open = ref(false)
const isLoading = ref(true)
const projects = ref<ProjectInterface[]>([])

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})

const handleSelect = (project: ProjectInterface) => {
  emit('update:modelValue', project)
  isOpen.value = false
}

onMounted(async () => {
  try {
    projects.value = await getProjectCollection({})
  } catch (error) {
    console.error('Error fetching projects:', error)
    projects.value = [defaultProject]
  } finally {
    isLoading.value = false
  }
})
</script>
