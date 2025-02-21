<template>
  <div class="grid gap-2">
    <Label>Repositories</Label>
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="Search repositories..." />
      <CommandList>
        <CommandEmpty>No repositories found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            v-for="repo in repositories"
            :key="repo.id"
            :value="repo.name"
            @select="toggleRepository(repo)"
          >
            <div class="flex items-center gap-2">
              <Checkbox
                :id="'repo-' + repo.id"
                :checked="selectedRepositories.some(r => r.id === repo.id)"
                @click="toggleRepository(repo)"
              />
              <div class="flex flex-col">
                <span>{{ repo.project.name }} / {{ repo.name }}</span>
                <span class="text-xs text-muted-foreground">{{ repo.description }}</span>
              </div>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { computed } from 'vue'
import {RepositoryInterface} from "@/interface/repository.interface.ts";

const props = defineProps<{
  repositories: RepositoryInterface[]
  modelValue: RepositoryInterface[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RepositoryInterface[]]
}>()

const selectedRepositories = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function toggleRepository(repo: RepositoryInterface) {
  const currentValue = [...selectedRepositories.value]
  const index = currentValue.findIndex(r => r.id === repo.id)
  
  if (index === -1) {
    currentValue.push(repo)
  } else {
    currentValue.splice(index, 1)
  }
  
  selectedRepositories.value = currentValue
}
</script>
