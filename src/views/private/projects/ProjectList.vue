<template>
  <div class="p-5">
    <div class="mb-5 flex justify-between items-center">
      <div class="flex space-x-2">
        <div class="relative w-full max-w-sm items-center">
          <Input 
            id="search" 
            type="text" 
            v-model="searchQuery"
            placeholder="Search projects..."
            class="pl-10" 
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>
      <ProjectCreate @create="handleProjectCreate" />
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="project in filteredProjects" :key="project.id" class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div class="flex items-center space-x-2">
            <CardTitle>{{ project.prefix }}</CardTitle>
            <CardTitle> - </CardTitle>
            <CardTitle>{{ project.name }}</CardTitle>
          </div>
        </CardHeader>
        <CardDescription>{{ project.description }}</CardDescription>
<!--        <CardContent>
          <div class="space-y-2">
            <div class="flex items-center text-sm text-muted-foreground">
              <Calendar class="h-4 w-4 mr-2" />
              Created {{ formatDate(project.createdAt) }}
            </div>
            <div class="flex items-center text-sm text-muted-foreground">
              <GitFork class="h-4 w-4 mr-2" />
              {{ project.repositories.length }} repositories
            </div>
          </div>
        </CardContent>-->
        <CardFooter>
          <Button variant="outline" class="w-full" @click="router.push(`/project/${project.id}/edit`)">
            View Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from 'lucide-vue-next'
import ProjectCreate from '@/components/project/ProjectCreate.vue'
import type {Project, ProjectInterface} from '@/interface/project.interface'
import {getProjectCollection} from "@/services/api/project.service.api.ts";
import {defaultProject} from "@/data/default/project.data.default.ts";

const router = useRouter()
const searchQuery = ref('')

// Mock data (replace with API call)
const projects = ref<ProjectInterface[]>([defaultProject])

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return projects.value
  const query = searchQuery.value.toLowerCase()
  return projects.value.filter(project => 
    project.name.toLowerCase().includes(query)
  )
})

function handleProjectCreate(newProject: Project) {
  projects.value.push(newProject)
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  projects.value = await getProjectCollection({})
})
</script>
