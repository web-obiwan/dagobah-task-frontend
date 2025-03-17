<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button>Add New Task</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogDescription>
          Create a new task for your project timeline.
        </DialogDescription>
      </DialogHeader>

      <form class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4" @submit.prevent="handleSubmit">
        <div class="space-y-2 md:col-span-2">
          <Label for="task-name">Task Name</Label>
          <Input id="task-name" v-model="newTask.name" required/>
        </div>
        <div class="space-y-2">
          <Label for="start-date">Start Date</Label>
          <Input id="start-date" v-model="newTask.start" required type="date"/>
        </div>
        <div class="space-y-2">
          <Label for="duration">Duration (days)</Label>
          <Input id="duration" v-model.number="newTask.duration" min="1" required type="number"/>
        </div>
        <div class="space-y-2">
          <ProjectSelect v-model="projectValue" />
        </div>
        <div class="space-y-2">
          <RepositorySelect v-model="repositoriesValue" />
        </div>

        <DialogFooter class="md:col-span-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Add Task</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import ProjectSelect from "@/components/issus/form/ProjectSelect.vue";
import RepositorySelect from "@/components/issus/form/RepositorySelect.vue";
import type { ProjectInterface } from "@/interface/project.interface.ts";
import type { RepositoryInterface } from "@/interface/repository.interface.ts";
import type { Task } from "@/types/gantt.types";

const props = defineProps<{
  project?: ProjectInterface;
  repositories?: RepositoryInterface[];
}>();

const emit = defineEmits<{
  'task-added': [task: Partial<Task>];
}>();

// Internal state with computed properties to sync with parent
const projectValue = computed({
  get: () => props.project,
  set: (value) => { /* Can be enhanced to emit update if needed */ }
});

const repositoriesValue = computed({
  get: () => props.repositories,
  set: (value) => { /* Can be enhanced to emit update if needed */ }
});

// New task form state
const newTask = ref<Partial<Task>>({
  name: '',
  start: new Date().toISOString().slice(0, 10),
  duration: 5
});

// Form submission handler
const handleSubmit = () => {
  emit('task-added', { ...newTask.value });

  // Reset form for next use
  newTask.value = {
    name: '',
    start: new Date().toISOString().slice(0, 10),
    duration: 5
  };
};
</script>
