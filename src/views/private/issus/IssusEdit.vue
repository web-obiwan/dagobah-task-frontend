<template>
  <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
    <div class="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
  </div>

  <div v-else-if="error" class="container mx-auto py-10 text-center">
    <h2 class="text-2xl font-bold text-destructive mb-4">Error</h2>
    <p class="text-muted-foreground">{{ error }}</p>
    <Button class="mt-4" @click="router.push('/issues')">Back to Issues</Button>
  </div>

  <IssusDetail
    v-else-if="currentIssue"
    v-model="currentIssue"
    @update:modelValue="handleIssueUpdate"
  />
  <div v-else class="container mx-auto py-10 text-center">
    <p class="text-muted-foreground">No issue data available</p>
    <Button class="mt-4" @click="router.push('/issues')">Back to Issues</Button>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import IssusDetail from './IssusDetail.vue'
import type {IssueInterface} from '@/interface/issus.interface'
import { useToast } from '@/components/ui/toast/use-toast'
import {issuesDataDefault} from "@/data/default/issues.data.default.ts";
import {updateIssue, getIssue} from "@/services/api/issus.service.api.ts";

const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const issueId = parseInt(route.params.id as string)

const currentIssue = ref<IssueInterface>({...issuesDataDefault})
const isLoading = ref(true)
const error = ref<string | null>(null)

async function fetchIssue(id: number) {
  try {
    currentIssue.value = await getIssue(id)
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load issue'
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.value
    })
  } finally {
    isLoading.value = false
  }
}

async function handleIssueUpdate(updatedIssue: IssueInterface) {
  try {
   await updateIssue(issueId, {
      ...updatedIssue,
      "project": updatedIssue.project?.['@id'] ?? null,
      "repositories": updatedIssue.repositories.map(item => item['@id']),
      "priority": updatedIssue.priority?.['@id'] ?? null,
      "owner": updatedIssue.owner?.['@id'] ?? null,
      "reviewer": updatedIssue.reviewer?.['@id'] ?? null,
      "reporter": updatedIssue.reporter?.['@id'] ?? null,
      "sprint": updatedIssue.sprint?.['@id'] ?? null,
      "labels": updatedIssue.labels.map(item => item['@id']),
    })

    toast({
      title: 'Success',
      description: 'Issue updated successfully'
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update issue'
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.value
    })
  }
}

onMounted(async () => {
  await fetchIssue(issueId)
})
</script>