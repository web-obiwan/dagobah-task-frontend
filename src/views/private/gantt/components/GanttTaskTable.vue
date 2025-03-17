<template>
  <Card>
    <CardHeader>
      <CardTitle>Task List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(task, index) in tasks" :key="task.id || index">
            <TableCell class="font-medium">{{ task.name }}</TableCell>
            <TableCell>{{ formatDate(task.start) }}</TableCell>
            <TableCell>{{ task.duration }} days</TableCell>
            <TableCell>
              <Button size="sm" variant="destructive" @click="$emit('remove-task', index)">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Task } from "@/types/gantt.types";

// Define props and emits
defineProps<{
  tasks: Task[];
  formatDate: (dateString: string) => string;
}>();

defineEmits<{
  'remove-task': [index: number];
}>();
</script>
