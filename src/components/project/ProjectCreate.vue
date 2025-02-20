<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button class="py-[1.17rem]">
        <CirclePlus class="w-4 h-4 mr-2"/>
        Create Project
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Fill in the project details and select repositories to include.
        </DialogDescription>
      </DialogHeader>
      <form v-if="repositories" @submit.prevent="onSubmit">
        <div class="grid gap-6 py-4">
          <div class="grid gap-4">
            <!-- Project Name -->
            <div class="grid gap-2">
              <Label for="name">Project Name</Label>
              <Input id="name" v-model="form.name" placeholder="Project name"/>
            </div>

            <!-- Repository Selection -->
            <RepositorySelect
                v-model="selectedRepositories"
                :repositories="repositories"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Project</Button>
        </DialogFooter>
      </form>
      <DefaultLoading v-else/>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useToast} from '@/components/ui/toast/use-toast'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
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
import type {ProjectSettings} from '@/interface/project.interface'
import {CirclePlus} from "lucide-vue-next";
import {getRepositoryCollection} from "@/services/api/repository.service.api.ts";
import {RepositoryInterface} from "@/interface/repository.interface.ts";
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";

const {toast} = useToast()

const repositories = ref<RepositoryInterface[] | null>(null)

// Form state
const form = ref({
  name: '',
})

const selectedRepositories = ref<RepositoryInterface[]>([])


// Form submission
async function onSubmit() {
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

onMounted(async () => {
  repositories.value = await getRepositoryCollection()
})
</script>
