<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="py-[1.17rem]" variant="outline">
        <LucideListFilter class="mr-2 h-4 w-4" />
        <span>Filter</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Filters</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ListMinus class="mr-2 h-4 w-4" />
            <span>Status</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem v-for="status in statuses" :key="status.name">
              <div class="flex items-center space-x-2">
                <Checkbox 
                  :id="'status-' + status.name" 
                  v-model:checked="status.checked" 
                  @update:checked="handleStatusChange(status)"
                />
                <Label :for="'status-' + status.name">{{ status.name }}</Label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag class="mr-2 h-4 w-4" />
            <span>Label</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem v-for="label in labels" :key="label.name">
              <div class="flex items-center space-x-2">
                <Checkbox 
                  :id="'label-' + label.name" 
                  v-model:checked="label.checked"
                  @update:checked="handleLabelChange(label)"
                />
                <Label :for="'label-' + label.name">{{ label.name }}</Label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Folder class="mr-2 h-4 w-4" />
            <span>Project</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem v-for="project in projects" :key="project.name">
              <div class="flex items-center space-x-2">
                <Checkbox 
                  :id="'project-' + project.name" 
                  v-model:checked="project.checked"
                  @update:checked="handleProjectChange(project)"
                />
                <Label :for="'project-' + project.name">{{ project.name }}</Label>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CalendarDays class="mr-2 h-4 w-4" />
            <span>Sprint</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem v-for="sprint in sprints" :key="sprint.name">
              <div class="flex items-center space-x-2">
                <Checkbox 
                  :id="'sprint-' + sprint.name" 
                  v-model:checked="sprint.checked"
                  @update:checked="handleSprintChange(sprint)"
                />
                <div>
                  <Label :for="'sprint-' + sprint.name">{{ sprint.name }}</Label>
                  <p class="text-xs text-muted-foreground">
                    {{ formatSprintDate(sprint.startDate) }} - {{ formatSprintDate(sprint.endDate) }}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />
      
      <DropdownMenuItem class="justify-center">
        <Button variant="ghost" class="w-full" @click="clearAllFilters">
          Clear Filters
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { LucideListFilter, ListMinus, Tag, Folder, CalendarDays } from 'lucide-vue-next'
import { mockSprints } from '@/mock/sprint.mock'

interface SubFilterItem {
  name: string
  checked: boolean
}

interface SprintFilterItem extends SubFilterItem {
  startDate: string
  endDate: string
}

const statuses = ref<SubFilterItem[]>([
  { name: 'Backlog', checked: false },
  { name: 'Planned', checked: false },
  { name: 'In Progress', checked: false },
  { name: 'Completed', checked: false },
  { name: 'Canceled', checked: false },
])

const labels = ref<SubFilterItem[]>([
  { name: 'Bug', checked: false },
  { name: 'Feature', checked: false },
  { name: 'Enhancement', checked: false },
  { name: 'Documentation', checked: false },
])

const projects = ref<SubFilterItem[]>([
  { name: 'Frontend', checked: false },
  { name: 'Backend', checked: false },
  { name: 'Mobile', checked: false },
])

const sprints = ref<SprintFilterItem[]>(
  mockSprints.map(sprint => ({
    name: sprint.name,
    checked: false,
    startDate: sprint.startDate,
    endDate: sprint.endDate
  }))
)

const emit = defineEmits<{
  (e: 'filter', filters: {
    statuses: string[]
    labels: string[]
    projects: string[]
    sprints: string[]
  }): void
}>()

function emitFilters() {
  emit('filter', {
    statuses: statuses.value.filter(s => s.checked).map(s => s.name),
    labels: labels.value.filter(l => l.checked).map(l => l.name),
    projects: projects.value.filter(p => p.checked).map(p => p.name),
    sprints: sprints.value.filter(s => s.checked).map(s => s.name)
  })
}

function handleStatusChange(status: SubFilterItem) {
  console.log(status)
  emitFilters()
}

function handleLabelChange(label: SubFilterItem) {
  console.log(label)
  emitFilters()
}

function handleProjectChange(project: SubFilterItem) {
  console.log(project)
  emitFilters()
}

function handleSprintChange(sprint: SprintFilterItem) {
  console.log(sprint)
  emitFilters()
}

function formatSprintDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

function clearAllFilters() {
  statuses.value.forEach(s => s.checked = false)
  labels.value.forEach(l => l.checked = false)
  projects.value.forEach(p => p.checked = false)
  sprints.value.forEach(s => s.checked = false)
  emitFilters()
}
</script>
