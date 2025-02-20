<template>
  <div class="px-5">
  <IssusDataTable v-if="dataResponse" :columns="columns" :dataResponse="dataResponse" :nbrPage="nbrPage"
                      @updateNbrPage="updateNbrPage"/>
    <DefaultLoading v-else/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import {inboxColumns} from "@/views/private/inbox/components/inbox.columns.ts"
import {IssueResponseInterface} from "@/interface/issus.interface.ts"
import {getIssuePaginationCollection} from "@/services/api/issus.service.api.ts"
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";
import IssusDataTable from "@/components/table/IssusDataTable.vue";

const dataResponse = ref<IssueResponseInterface | null>(null)
const nbrPage = ref<number>(1)

const columns = inboxColumns()

const loadIssues = async () => {
  try {
    dataResponse.value = await getIssuePaginationCollection(nbrPage.value)
  } catch (error) {
    console.error('Error loading issues:', error)
  }
}

const updateNbrPage = (value: number) => {
  nbrPage.value = value;
};

onMounted(async () => {
  await loadIssues()
})

watch(nbrPage, async () => {
  await loadIssues()
})
</script>
