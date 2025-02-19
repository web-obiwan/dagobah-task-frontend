<template>
  <div class="px-5">
<!--    <DefaultDataTable v-if="!isLoading" :columns="columns" :dataResponse="dataResponse" :nbrPage="nbrPage"-->
<!--                      @updateNbrPage="updateNbrPage"/>
    <DefaultLoading v-else/>-->
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {inboxColumns} from "@/views/private/inbox/components/inbox.columns.ts"
import {IssueInterface, IssueResponseInterface} from "@/interface/issus.interface.ts"
import {getIssuePaginationCollection} from "@/services/api/issus.service.api.ts"
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";
import DefaultDataTable from "@/components/table/DefaultDataTable.vue";

const dataResponse = ref<IssueResponseInterface | null>(null)
const data = ref<IssueInterface[]>([])
const isLoading = ref(false)
const nbrPage = ref<number>(1)

const columns = inboxColumns()

const loadIssues = async () => {
  try {
    isLoading.value = true
    data.value = await getIssuePaginationCollection(nbrPage.value)
  } catch (error) {
    console.error('Error loading issues:', error)
  } finally {
    isLoading.value = false
  }
}

const updateNbrPage = (value: number) => {
  nbrPage.value = value;
};

onMounted(async () => {
  await loadIssues()
})
</script>
