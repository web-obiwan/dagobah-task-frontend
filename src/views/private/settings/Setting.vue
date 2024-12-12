<template>
  <div class="px-5">
    <Title>
      Settings
    </Title>
    <AutoForm
        class="space-y-6 mt-5"
        :schema="schema"
        @submit="onSubmit"
    >
      <Button type="submit">
        Submit
      </Button>
    </AutoForm>
  </div>
</template>

<script setup lang="ts">
import {AutoForm} from '@/components/ui/auto-form'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'
import {Title} from "@/components/ui/text";
import {h} from 'vue'
import * as z from 'zod'

const schema = z
    .object({
      id: z.string(),
      token: z.string(),
      url: z.string(),
    })

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', {class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4'}, h('code', {class: 'text-white'}, JSON.stringify(values, null, 2))),
  })
}
</script>