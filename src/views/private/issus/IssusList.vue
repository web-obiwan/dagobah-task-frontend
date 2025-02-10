<template>
  <div class="px-5">
    <IssuesDataTable v-if="!isLoading" :columns="columns" :data="issues as any">
      <div class="w-full flex justify-start ml-5">
        <AssigneeSelect :isLabel="false" v-model="assigneeFilter"  label=""/>
      </div>
    </IssuesDataTable>
    <DefaultLoading v-else/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {inboxColumns} from "@/views/private/inbox/components/inbox.columns.ts"
import IssuesDataTable from '@/components/table/IssusDataTable.vue'
import type {UserInterface} from "@/interface/user.interface.ts"
import type {IssueInterface} from "@/interface/issus.interface.ts"
import {getIssueCollection} from "@/services/api/issus.service.api.ts"
import AssigneeSelect from "@/components/issus/form/AssigneeSelect.vue"
import {issuesDataDefault} from "@/data/default/issues.data.default.ts";
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";

const assigneeFilter = ref<UserInterface | null>(null)
const issues = ref<IssueInterface[]>([issuesDataDefault])
const isLoading = ref(false)

const columns = inboxColumns()

const loadIssues = async () => {
  try {
    isLoading.value = true
    issues.value = await getIssueCollection({})
  } catch (error) {
    console.error('Error loading issues:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadIssues()
})
</script>