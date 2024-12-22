<template>
  <div class="grid gap-2">
    <Label>Project Icon</Label>
    <Select v-model="selectedIcon">
      <SelectTrigger>
        <SelectValue placeholder="Select an icon">
          <div v-if="selectedIcon" class="flex items-center gap-2">
            <component :is="selectedIcon" class="h-4 w-4" />
            {{ getIconName(selectedIcon) }}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Icons</SelectLabel>
          <div class="grid grid-cols-4 gap-2 p-2 max-h-[300px] overflow-y-auto">
            <SelectItem 
              v-for="icon in availableIcons" 
              :key="icon.name" 
              :value="icon.component"
              class="cursor-pointer hover:bg-accent"
            >
              <div class="flex items-center gap-2">
                <component :is="icon.component" class="h-4 w-4" />
                <span class="text-xs truncate">{{ icon.name }}</span>
              </div>
            </SelectItem>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Code,
  CodeSquare,
  Cog,
  Command as CommandIcon,
  Component,
  Container,
  Cpu,
  Database,
  Files,
  FileCode,
  FileJson,
  FileLock,
  FileText,
  Folder,
  FolderClosed,
  FolderDot,
  FolderGit,
  FolderInput,
  FolderKanban,
  FolderKey,
  FolderLock,
  FolderOpen,
  FolderOutput,
  FolderSearch,
  FolderSync,
  FolderTree,
  GitBranch,
  GitCommit,
  GitCompare,
  GitFork,
  GitGraph,
  GitMerge,
  GitPullRequest,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  Library,
  Link,
  Package,
  PackageCheck,
  PackagePlus,
  Puzzle,
  PuzzleIcon,
  Rocket,
  Server,
  Settings,
  Shield,
  Terminal,
  Webhook,
  Workflow,
  Wrench
} from 'lucide-vue-next'

import { computed } from 'vue'

const props = defineProps<{
  modelValue: any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const selectedIcon = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Available icons for selection
const availableIcons = [
  { name: 'Code', component: Code },
  { name: 'Code Square', component: CodeSquare },
  { name: 'Cog', component: Cog },
  { name: 'Command', component: CommandIcon },
  { name: 'Component', component: Component },
  { name: 'Container', component: Container },
  { name: 'Cpu', component: Cpu },
  { name: 'Database', component: Database },
  { name: 'Files', component: Files },
  { name: 'File Code', component: FileCode },
  { name: 'File Json', component: FileJson },
  { name: 'File Lock', component: FileLock },
  { name: 'File Text', component: FileText },
  { name: 'Folder', component: Folder },
  { name: 'Folder Closed', component: FolderClosed },
  { name: 'Folder Dot', component: FolderDot },
  { name: 'Folder Git', component: FolderGit },
  { name: 'Folder Input', component: FolderInput },
  { name: 'Folder Kanban', component: FolderKanban },
  { name: 'Folder Key', component: FolderKey },
  { name: 'Folder Lock', component: FolderLock },
  { name: 'Folder Open', component: FolderOpen },
  { name: 'Folder Output', component: FolderOutput },
  { name: 'Folder Search', component: FolderSearch },
  { name: 'Folder Sync', component: FolderSync },
  { name: 'Folder Tree', component: FolderTree },
  { name: 'Git Branch', component: GitBranch },
  { name: 'Git Commit', component: GitCommit },
  { name: 'Git Compare', component: GitCompare },
  { name: 'Git Fork', component: GitFork },
  { name: 'Git Graph', component: GitGraph },
  { name: 'Git Merge', component: GitMerge },
  { name: 'Git Pull Request', component: GitPullRequest },
  { name: 'Github', component: Github },
  { name: 'Globe', component: Globe },
  { name: 'Layers', component: Layers },
  { name: 'Layout Grid', component: LayoutGrid },
  { name: 'Library', component: Library },
  { name: 'Link', component: Link },
  { name: 'Package', component: Package },
  { name: 'Package Check', component: PackageCheck },
  { name: 'Package Plus', component: PackagePlus },
  { name: 'Puzzle', component: Puzzle },
  { name: 'Puzzle Icon', component: PuzzleIcon },
  { name: 'Rocket', component: Rocket },
  { name: 'Server', component: Server },
  { name: 'Settings', component: Settings },
  { name: 'Shield', component: Shield },
  { name: 'Terminal', component: Terminal },
  { name: 'Webhook', component: Webhook },
  { name: 'Workflow', component: Workflow },
  { name: 'Wrench', component: Wrench }
]

// Helper function to get icon name
const getIconName = (iconComponent: any) => {
  const icon = availableIcons.find(icon => icon.component === iconComponent)
  return icon ? icon.name : ''
}
</script>
