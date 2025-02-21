<template>
  <div class="px-5">
    <DefaultDataTable v-if="!isLoading" :columns="columns" :dataResponse="{...responseDataDefault, member: sprints}" >
      <RouterLink :to="{name: 'SprintsCreate'}">
        <Button>
          <CirclePlus class="w-4 h-4 mr-2"/>
          Create sprint
        </Button>
      </RouterLink>
    </DefaultDataTable>
    <DefaultLoading v-else/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {sprintColumns} from "@/views/private/sprints/components/sprint.columns.ts"
import type {SprintInterface} from "@/interface/sprint.interface.ts"
import {getSprintCollection} from "@/services/api/sprint.service.api.ts"
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";
import DefaultDataTable from "@/components/table/DefaultDataTable.vue";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";
import {CirclePlus} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {responseDataDefault} from "@/data/default/response.data.default.ts";

const sprints = ref<SprintInterface[]>([defaultSprint])
const isLoading = ref(false)

const columns = sprintColumns()

const loadIssues = async () => {
  try {
    isLoading.value = true
    sprints.value = await getSprintCollection({})
  } catch (error) {
    console.error('Error loading sprints:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadIssues()
})
</script>
