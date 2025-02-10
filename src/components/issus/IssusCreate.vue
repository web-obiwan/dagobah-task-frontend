<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button class="py-[1.17rem]" variant="outline">Create Issue</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>Create New Issue</DialogTitle>
        <DialogDescription>
          Fill in the details for your new issue. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-6" @submit="onSubmit">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Issue name"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>

          <!-- Selects avec v-model -->
          <ProjectSelect v-model="formData.project"/>
          <AssigneeSelect v-model="formData.owner" label="Owner"/>
          <AssigneeSelect v-model="formData.reviewer" label="Reviewer"/>
          <AssigneeSelect v-model="formData.reporter" label="Reporter"/>
          <SprintSelect v-model="formData.sprint"/>
          <PrioritySelect v-model="formData.priority"/>
          <StatusSelect v-model="formData.status"/>
          <LabelSelect v-model="formData.labels"/>
          <RepositorySelect v-model="formData.repositories"/>

          <div class="col-span-2 row-span-2">
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                <Textarea
                    v-bind="componentField"
                    placeholder="Describe the issue..."
                    rows="5"
                />
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="syncWithGitlab">
            <FormItem class="flex items-center space-x-2">
              <FormControl>
                <Switch v-bind="componentField"/>
              </FormControl>
              <FormLabel>Sync with GitLab</FormLabel>
              <FormMessage/>
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button v-if="isFormValid" type="submit">Create Issue</Button>
          <Button v-else disabled type="submit">Create Issue</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Switch} from '@/components/ui/switch'
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'
import * as z from 'zod'
import {useRouter} from "vue-router";

import ProjectSelect from './form/ProjectSelect.vue'
import AssigneeSelect from './form/AssigneeSelect.vue'
import SprintSelect from './form/SprintSelect.vue'
import PrioritySelect from './form/PrioritySelect.vue'
import StatusSelect from './form/StatusSelect.vue'
import LabelSelect from "./form/LabelSelect.vue"
import RepositorySelect from "@/components/issus/form/RepositorySelect.vue";

import {IssuesStatus} from '@/interface/issus.interface'
import type {ProjectInterface} from '@/interface/project.interface'
import type {UserInterface} from '@/interface/user.interface'
import type {SprintInterface} from '@/interface/sprint.interface'
import type {LabelInterface} from '@/interface/label.interface'
import type {RepositoryInterface} from "@/interface/repository.interface.ts";

import {createIssue} from "@/services/api/issus.service.api.ts";
import {PriorityInterface} from "@/interface/priority.interface.ts";
import {toast} from "@/components/ui/toast";

const router = useRouter()

const isFormValid = ref<boolean>(false)
const formData = ref({
  project: null as ProjectInterface | null,
  priority: null as PriorityInterface | null,
  status: 'BACKLOG' as IssuesStatus,
  owner: null as UserInterface | null,
  repositories: [] as RepositoryInterface[],
  reviewer: null as UserInterface | null,
  reporter: null as UserInterface | null,
  sprint: null as SprintInterface | null,
  labels: [] as LabelInterface[],
})

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  description: z.string().optional(),
  syncWithGitlab: z.boolean().default(true),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await createIssue({
      "name": values.name,
      "project": formData.value.project?.['@id'] ?? null,
      "repositories": formData.value.repositories.map(item => item['@id']),
      "priority": formData.value.priority?.['@id'] ?? null,
      "status": formData.value.status,
      "owner": formData.value.owner?.['@id'] ?? null,
      "reviewer": formData.value.reviewer?.['@id'] ?? null,
      "reporter": formData.value.reporter?.['@id'] ?? null,
      "sprint": formData.value.sprint?.['@id'] ?? null,
      "labels": formData.value.labels.map(item => item['@id']),
    })

    await router.push({name: 'IssusEdit', params: {id: response.id}})
  } catch (e) {
    console.error(e)
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  }
})

watch(formData.value, (newData) => {
  if (
      newData.repositories.length > 0 &&
      newData.project &&
      newData.priority &&
      newData.status
  ) {
    isFormValid.value = true
  } else {
    isFormValid.value = false
  }
}, { deep: true })
</script>