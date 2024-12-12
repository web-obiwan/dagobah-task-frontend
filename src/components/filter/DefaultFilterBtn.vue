<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <LucideListFilter />
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
            <DropdownMenuItem
                v-for="(status, index) in statuses"
                :key="`status-${index}`"
            >
              <input type="checkbox" v-model="status.checked" class="mr-2" />
              {{ status.name }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LucideActivity class="mr-2 h-4 w-4" />
            <span>Label</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
                v-for="(label, index) in labels"
                :key="`label-${index}`"
            >
              <input type="checkbox" v-model="label.checked" class="mr-2" />
              {{ label.name }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ListMinus class="mr-2 h-4 w-4" />
            <span>Project</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
                v-for="(project, index) in projects"
                :key="`project-${index}`"
            >
              <input type="checkbox" v-model="project.checked" class="mr-2" />
              {{ project.name }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LucidePanel class="mr-2 h-4 w-4" />
            <span>Sprint</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
                v-for="(sprint, index) in sprints"
                :key="`sprint-${index}`"
            >
              <input type="checkbox" v-model="sprint.checked" class="mr-2" />
              {{ sprint.name }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ref } from 'vue';
import { LucideListFilter, LucideActivity, ListMinus } from 'lucide-vue-next';

type SubFilterItem = {
  name: string;
  checked: boolean;
};

const statuses = ref<SubFilterItem[]>([
  { name: 'Backlog', checked: false },
  { name: 'Planned', checked: false },
  { name: 'In Progress', checked: false },
  { name: 'Completed', checked: false },
  { name: 'Canceled', checked: false },
]);

const labels = ref<SubFilterItem[]>([
  { name: 'Bug', checked: false },
  { name: 'Feature', checked: false },
  { name: 'Improvement', checked: false },
]);

const projects = ref<SubFilterItem[]>([
  { name: 'Project A', checked: false },
  { name: 'Project B', checked: false },
  { name: 'Project C', checked: false },
]);

const sprints = ref<SubFilterItem[]>([
  { name: 'Sprint 1', checked: false },
  { name: 'Sprint 2', checked: false },
  { name: 'Sprint 3', checked: false },
]);
</script>

<style scoped>
/* Ajoutez ici des styles personnalisés si nécessaire */
</style>
