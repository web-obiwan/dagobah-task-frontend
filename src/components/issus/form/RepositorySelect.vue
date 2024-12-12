<template>
  <div class="grid gap-2">
    <Label for="repository">Repositories</Label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
            variant="outline"
            role="combobox"
            :aria-expanded="isOpen"
            class="w-full justify-between"
        >
          <div v-if="selectedRepositories.length" class="flex flex-wrap gap-1">
            <span
                v-for="repo in selectedRepositories.slice(0, 2)"
                :key="repo.id"
                class="rounded px-1 text-xs bg-muted"
            >
              {{ `${repo.project.name} / ${repo.name}` }}
            </span>
            <span v-if="selectedRepositories.length > 2" class="text-xs text-muted-foreground">
              +{{ selectedRepositories.length - 2 }}
            </span>
          </div>
          <span v-else>Select repositories...</span>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search repositories..." />
          <CommandEmpty>No repository found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <template v-if="!isLoading">
                <CommandItem
                    v-for="repository in filteredRepositories"
                    :key="repository.id"
                    :value="repository"
                    @select="toggleRepository(repository)"
                >
                  <Check
                      :class="[
                      'mr-2 h-4 w-4',
                      isSelected(repository) ? 'opacity-100' : 'opacity-0'
                    ]"
                  />
                  <div class="flex flex-col">
                    <span>{{ `${repository.project.name} / ${repository.name}` }}</span>
                    <span class="text-xs text-muted-foreground">
                      {{ repository.description }}
                    </span>
                  </div>
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
import { getRepositoryCollection } from "@/services/api/repository.service.api"
import type { RepositoryInterface } from "@/interface/repository.interface"
import type { ProjectInterface } from "@/interface/project.interface"
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue"

const props = withDefaults(defineProps<{
  modelValue?: RepositoryInterface[]
  project?: ProjectInterface | null
}>(), {
  modelValue: () => [],
  project: null
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: RepositoryInterface[]): void
}>()

const open = ref(false)
const isLoading = ref(true)
const repositories = ref<RepositoryInterface[]>([])

const selectedRepositories = computed(() => props.modelValue || [])

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})

const filteredRepositories = computed(() => {
  if (!props.project) return repositories.value
  return repositories.value.filter(repo => repo.project.id === props.project?.id)
})

const isSelected = (repository: RepositoryInterface) => {
  return selectedRepositories.value.some(selected => selected.id === repository.id)
}

const toggleRepository = (repository: RepositoryInterface) => {
  const currentSelection = [...selectedRepositories.value]
  const index = currentSelection.findIndex(selected => selected.id === repository.id)

  if (index === -1) {
    currentSelection.push(repository)
  } else {
    currentSelection.splice(index, 1)
  }

  emit('update:modelValue', currentSelection)
}

onMounted(async () => {
  try {
    repositories.value = await getRepositoryCollection()
  } catch (error) {
    console.error('Error fetching repositories:', error)
    repositories.value = []
  } finally {
    isLoading.value = false
  }
})
</script>