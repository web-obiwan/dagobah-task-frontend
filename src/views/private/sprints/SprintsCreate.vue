<template>
  <div class="p-5 w-full">
  <DefaultTitleNavHeader title="Create sprint"/>
<!--  <AutoForm
      class="w-full space-y-6"
      :schema="schema"
      :field-config="{
      name: {
        label: 'Sprint Name',
        description: 'Enter the name for this sprint',
        inputProps: {
          placeholder: 'Sprint 2024-Q1',
        },
      },
      begunAt: {
        label: 'Start Date',
        description: 'Select the sprint start date',
      },
      endedAt: {
        label: 'End Date',
        description: 'Select the sprint end date',
      },
    }"
      @submit="onSubmit"
  >
    <template #default="{ loading }">
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Sprint' }}
      </Button>
    </template>
  </AutoForm>-->
  </div>
</template>

<script setup lang="ts">
/*import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'*/
/*import { toast } from '@/components/ui/toast'
import * as z from 'zod'*/
import DefaultTitleNavHeader from "@/components/header/DefaultTitleNavHeader.vue";
/*import {createSprint} from "@/services/api/sprint.service.api.ts";

import {useRouter} from "vue-router";
import {catchUtils} from "@/utils/catch.utils.ts";

const router = useRouter()*/

/*const schema = z.object({
  name: z
      .string({
        required_error: 'Sprint name is required.',
      })
      .min(2, {
        message: 'Sprint name must be at least 2 characters.',
      }),
  begunAt: z.coerce
      .date({
        required_error: 'Start date is required.',
      })
      .min(new Date(), {
        message: 'Start date must be in the future.',
      }),
  endedAt: z.coerce
      .date({
        required_error: 'End date is required.',
      })
      .min(new Date(), {
        message: 'End date must be in the future.',
      }),
})*/

/*async function onSubmit(values: z.infer<typeof schema>) {
  if (values.endedAt < values.begunAt) {
    toast({
      title: 'Error',
      description: 'End date must be after start date',
      variant: 'destructive',
    })
    return
  }

  try {
    await createSprint(values)
    await router.push({name: 'SprintList'})
  } catch (err) {
    catchUtils(err)
  }
}*/
</script>
