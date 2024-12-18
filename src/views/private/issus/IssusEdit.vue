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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import IssusDetail from './IssusDetail.vue'
import type { Issus } from '@/interface/issus.interface'
import { mockIssusData } from '@/mock/issus.mock'
import { useToast } from '@/components/ui/toast/use-toast'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const currentIssue = ref<Issus | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Dans un vrai projet, cette fonction ferait un appel API
async function fetchIssue(id: number) {
  try {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Chercher dans toutes les colonnes du kanban
    const issue = Object.values(mockIssusData).flat().find(issue => issue.id === id)
    
    if (!issue) {
      throw new Error('Issue not found')
    }
    
    currentIssue.value = { ...issue }
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

async function handleIssueUpdate(updatedIssue: Issus) {
  try {
    isLoading.value = true
    // Simuler un délai réseau
   // await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mettre à jour l'issue dans les données mockées
   // const allIssues = Object.values(mockIssusData).flat()
   // const issueIndex = allIssues.findIndex(issue => issue.id === updatedIssue.id)
    
   // if (issueIndex === -1) {
   //   throw new Error('Issue not found')
   // }
    
    // Dans un vrai cas, on ferait un appel API ici
   // currentIssue.value = { ...updatedIssue }
    
    toast({
      title: 'Success',
      description: 'Issue updated successfully'
    })
    
    // Rediriger vers la liste des issues après la mise à jour
   // router.push('/issues')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update issue'
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error.value
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const issueId = parseInt(route.params.id as string)
  if (isNaN(issueId)) {
    error.value = 'Invalid issue ID'
    isLoading.value = false
    return
  }
  
  await fetchIssue(issueId)
})
</script>