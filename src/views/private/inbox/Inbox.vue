<template>
    <DefaultDataTable :columns="columns" :data="flatIssues" />
  </template>

<script lang="ts" setup>
import { computed } from 'vue'
import {inboxColumns} from "@/views/private/inbox/components/inbox.columns.ts";
import {mockIssusData} from "@/mock/issus.mock";
import DefaultDataTable from '@/components/table/DefaultDataTable.vue'

const columns = inboxColumns();

// Convertir les données du KanbanBoard en une liste plate d'issues
const flatIssues = computed(() => {
  return [
    ...mockIssusData.backlog,
    ...mockIssusData.planned,
    ...mockIssusData.inProgress,
    ...mockIssusData.completed,
    ...mockIssusData.canceled
  ]
})
</script>