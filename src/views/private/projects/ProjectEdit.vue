<template>
  <div class="p-5">
    <!-- Project Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <component :is="project.icon" class="h-8 w-8" />
          <div>
            <h1 class="text-2xl font-bold">{{ project.name }}</h1>
            <p class="text-sm text-muted-foreground">
              Created {{ formatDate(project.createdAt) }}
            </p>
          </div>
        </div>
        <div class="flex space-x-2">
          <Button variant="outline" @click="showSettings = true">
            <Settings2 class="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>

    <!-- Project Navigation -->
    <Tabs v-model="activeTab" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="issues">Issues</TabsTrigger>
        <TabsTrigger value="repositories">Repositories</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Project Stats -->
          <Card>
            <CardHeader>
              <CardTitle>Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ projectStats.totalIssues }}</div>
              <p class="text-sm text-muted-foreground">Total issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ projectStats.openIssues }}</div>
              <p class="text-sm text-muted-foreground">Issues to be resolved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repositories</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-3xl font-bold">{{ project.repositories.length }}</div>
              <p class="text-sm text-muted-foreground">Connected repositories</p>
            </CardContent>
          </Card>
        </div>

        <!-- Recent Activity -->
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-4">
                <div class="mt-1">
                  <component :is="activity.icon" class="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-sm">{{ activity.description }}</p>
                  <p class="text-xs text-muted-foreground">{{ formatDate(activity.date) }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="issues">
        <Card>
          <CardHeader class="space-y-4">
            <div class="flex items-center justify-between">
              <CardTitle>Issues</CardTitle>
              <Button @click="showCreateIssue = true">
                <Plus class="h-4 w-4 mr-2" />
                New Issue
              </Button>
            </div>
            
            <!-- Filters -->
            <div class="flex flex-wrap gap-2">
              <Select v-model="issueFilters.status">
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="issueFilters.priority">
                <SelectTrigger class="w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Input 
                v-model="issueFilters.search"
                placeholder="Search issues..."
                class="w-[200px]"
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="issue in filteredIssues" :key="issue.id">
                  <TableCell>{{ issue.title }}</TableCell>
                  <TableCell>
                    <Badge :variant="getStatusVariant(issue.status)">
                      {{ issue.status }}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge :variant="getPriorityVariant(issue.priority)">
                      {{ issue.priority }}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center">
                      <Avatar class="h-6 w-6">
                        <AvatarImage :src="issue.assignee.avatar" />
                        <AvatarFallback>{{ getInitials(issue.assignee.name) }}</AvatarFallback>
                      </Avatar>
                      <span class="ml-2">{{ issue.assignee.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell>{{ formatDate(issue.createdAt) }}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" @click="router.push(`/issues/${issue.id}`)">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="repositories">
        <Card>
          <CardHeader>
            <CardTitle>Connected Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-for="repo in project.repositories" :key="repo.id" class="flex items-start justify-between p-4 border rounded-lg">
                <div class="space-y-1">
                  <div class="flex items-center space-x-2">
                    <GitFork class="h-5 w-5" />
                    <h3 class="font-medium">{{ repo.name }}</h3>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ repo.description }}</p>
                </div>
                <Button variant="outline" size="sm" @click="openRepository(repo.url)">
                  <ExternalLink class="h-4 w-4 mr-2" />
                  View Repository
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Settings Dialog -->
    <Dialog v-model:open="showSettings">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Project Name</Label>
            <Input v-model="projectSettings.name" />
          </div>
          <div class="space-y-2">
            <Label>Project Icon</Label>
            <Select v-model="projectSettings.icon">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="icon in availableIcons" :key="icon.name" :value="icon.component">
                  <div class="flex items-center gap-2">
                    <component :is="icon.component" class="h-4 w-4" />
                    <span>{{ icon.name }}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showSettings = false">Cancel</Button>
          <Button @click="saveProjectSettings">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Create Issue Dialog -->
    <Dialog v-model:open="showCreateIssue">
      <DialogContent class="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Title</Label>
            <Input v-model="newIssue.title" placeholder="Issue title" />
          </div>
          <div class="space-y-2">
            <Label>Description</Label>
            <Textarea v-model="newIssue.description" placeholder="Describe the issue..." />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Status</Label>
              <StatusSelect v-model="newIssue.status" />
            </div>
            <div class="space-y-2">
              <Label>Priority</Label>
              <PrioritySelect v-model="newIssue.priority" />
            </div>
            <div class="space-y-2">
              <Label>Assignee</Label>
              <AssigneeSelect v-model="newIssue.assignee" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCreateIssue = false">Cancel</Button>
          <Button @click="createIssue">Create Issue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Settings2,
  Plus,
  GitFork,
  ExternalLink,
} from 'lucide-vue-next'
import StatusSelect from '@/components/issus/form/StatusSelect.vue'
import PrioritySelect from '@/components/issus/form/PrioritySelect.vue'
import AssigneeSelect from '@/components/issus/form/AssigneeSelect.vue'
import type { Project } from '@/interface/project.interface'

const router = useRouter()
const activeTab = ref('overview')
const showSettings = ref(false)
const showCreateIssue = ref(false)

// Mock project data (replace with API call)
const project = ref<Project>({
  id: 1,
  name: 'Frontend App',
  icon: 'FolderKanban',
  repositories: [
    { id: 1, name: 'frontend-app', url: 'https://github.com/org/frontend-app', description: 'Main frontend application' },
  ],
  createdAt: '2024-12-01T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z'
})

// Project Stats
const projectStats = ref({
  totalIssues: 42,
  openIssues: 12,
})

// Recent Activity
const recentActivity = ref([
  {
    id: 1,
    icon: 'Plus',
    description: 'New issue created: "Fix navigation bug"',
    date: '2024-12-22T10:00:00Z'
  },
  // Add more activities
])

// Issue Management
const issueFilters = ref({
  status: 'all',
  priority: 'all',
  search: ''
})

const issues = ref([
  {
    id: 1,
    title: 'Fix navigation bug',
    status: 'open',
    priority: 'high',
    assignee: {
      id: 1,
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png'
    },
    createdAt: '2024-12-22T10:00:00Z'
  },
  // Add more issues
])

const filteredIssues = computed(() => {
  return issues.value.filter(issue => {
    const matchesStatus = issueFilters.value.status === 'all' || issue.status === issueFilters.value.status
    const matchesPriority = issueFilters.value.priority === 'all' || issue.priority === issueFilters.value.priority
    const matchesSearch = issue.title.toLowerCase().includes(issueFilters.value.search.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })
})

// Project Settings
const projectSettings = ref({
  name: project.value.name,
  icon: project.value.icon
})

function saveProjectSettings() {
  project.value.name = projectSettings.value.name
  project.value.icon = projectSettings.value.icon
  showSettings.value = false
}

// New Issue
const newIssue = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
  assignee: null
})

function createIssue() {
  // Add the new issue to the list
  issues.value.push({
    id: Date.now(),
    title: newIssue.value.title,
    status: newIssue.value.status,
    priority: newIssue.value.priority,
    assignee: newIssue.value.assignee,
    createdAt: new Date().toISOString()
  })
  
  showCreateIssue.value = false
  // Reset form
  newIssue.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: null
  }
}

// Utility functions
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getStatusVariant(status: 'open' | 'in-progress' | 'done' | string): string {
  const variants: Record<string, string> = {
    open: 'default',
    'in-progress': 'warning',
    done: 'success'
  }
  return variants[status] || 'default'
}

function getPriorityVariant(priority: string) {
  const variants = {
    high: 'destructive',
    medium: 'warning',
    low: 'default'
  } as const;
  return priority in variants ? variants[priority as keyof typeof variants] : 'default';
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function openRepository(url: string) {
  window.open(url, '_blank')
}
</script>
