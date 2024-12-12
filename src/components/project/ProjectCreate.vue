<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button class="py-[1.17rem]" variant="outline">Create Project</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Fill in the project details and select repositories to include.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-6 py-4">
          <div class="grid gap-4">
            <!-- Project Name -->
            <div class="grid gap-2">
              <Label for="name">Project Name</Label>
              <Input id="name" v-model="form.name" placeholder="Project name" />
            </div>

            <!-- Repository Selection -->
            <RepositorySelect 
              v-model="selectedRepositories"
              :repositories="mockRepositories"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" :disabled="!isFormValid">Create Project</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import RepositorySelect from './RepositorySelect.vue'
import type { Repository, ProjectSettings } from '@/interface/project.interface'

const { toast } = useToast()

// Mock repositories (replace with real data from your backend)
const mockRepositories: Repository[] = [
  { id: 1, name: 'frontend-app', url: 'https://github.com/org/frontend-app', description: 'Main frontend application' },
  { id: 2, name: 'backend-api', url: 'https://github.com/org/backend-api', description: 'Core backend API' },
  { id: 3, name: 'shared-lib', url: 'https://github.com/org/shared-lib', description: 'Shared utilities and components' },
  { id: 4, name: 'docs', url: 'https://github.com/org/docs', description: 'Project documentation' },
]

// Form state
const form = ref({
  name: '',
  icon: null as any,
})

const selectedRepositories = ref<Repository[]>([])

// Computed properties
const isFormValid = computed(() => {
  return form.value.name.trim() !== '' && form.value.icon !== null
})

// Form submission
async function onSubmit() {
  if (!isFormValid.value) return

  const project = {
    id: Date.now(),
    name: form.value.name,
    repositories: selectedRepositories.value,
    settings: {} as ProjectSettings,
  }

  toast({
    title: 'Project created!',
    description: `Successfully created project "${project.name}"`,
  })
}
</script>
