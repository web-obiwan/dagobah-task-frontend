<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button class="py-[1.18rem]" variant="outline">Create Issue</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Create New Issue</DialogTitle>
        <DialogDescription>
          Fill in the details for your new issue. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-6 py-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" v-model="form.name" placeholder="Issue name" />
            </div>
            <div class="grid gap-2">
              <Label for="reference">Reference</Label>
              <Input id="reference" v-model="form.reference" placeholder="REF-001" />
            </div>
            
            <ProjectSelect v-model="form.project" />
            <AssigneeSelect v-model="form.assignee" />
            
            <SprintSelect v-model="form.sprint" />
            <PrioritySelect v-model="form.priority" />
            
            <StatusSelect v-model="form.status" />
          </div>
          
          <div class="grid gap-2">
            <Label for="description">Description</Label>
            <Textarea 
              id="description" 
              v-model="form.description" 
              placeholder="Describe the issue..."
              rows="5"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Issue</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import ProjectSelect from './form/ProjectSelect.vue'
import AssigneeSelect from './form/AssigneeSelect.vue'
import SprintSelect from './form/SprintSelect.vue'
import PrioritySelect from './form/PrioritySelect.vue'
import StatusSelect from './form/StatusSelect.vue'

import type { Project } from '@/interface/issus.interface'
import type { User } from '@/interface/user.interface'
import type { Sprint } from '@/interface/sprint.interface'

const emit = defineEmits(['create'])

const form = ref({
  name: '',
  reference: '',
  description: '',
  project: null as Project | null,
  priority: '',
  status: 'backlog',
  assignee: null as User | null,
  sprint: null as Sprint | null,
  labels: []
})

const onSubmit = () => {
  if (!form.value.project) {
    return
  }

  emit('create', {
    ...form.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  form.value = {
    name: '',
    reference: '',
    description: '',
    project: null,
    priority: '',
    status: 'backlog',
    assignee: null,
    sprint: null,
    labels: []
  }
}
</script>
