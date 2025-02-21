<template>
  <div v-if="issues[0].id !== 0" class="p-6">
    <h1 class="text-2xl font-bold mb-6">Statistiques du Sprint : {{sprint.name}}</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-muted rounded-lg shadow p-4">
        <h3 class="text-sm">Issues totales</h3>
        <p class="text-2xl font-bold">{{ issues.length }}</p>
      </div>
      <div class="bg-muted rounded-lg shadow p-4">
        <h3 class="text-sm">Story points totaux</h3>
        <p class="text-2xl font-bold">{{ dataSumVal.totalStoryPoints }}</p>
      </div>
      <div class="bg-muted rounded-lg shadow p-4">
        <h3 class="text-sm">Issues haute priorité</h3>
        <p class="text-2xl font-bold">{{ dataSumVal.highPriorityCount }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-muted rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Répartition des tags (pondérée par story points)</h2>
          <DonutChart
              :category="'total'"
              :colors="tagColors"
              :data="tagsData"
              :value-formatter="valueFormatter"
              index="name"
          />
      </div>

      <div class="bg-muted rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Répartition des priorités (pondérée par story points)</h2>
          <BarChart
              :categories="['total']"
              :colors="['#f59e0b']"
              :data="priorityData"
              :value-formatter="valueFormatter"
              index="name"
          />
      </div>
    </div>
    <IssusDataTable v-if="issues" :columns="columns" :dataResponse="{...responseDataDefault, member: issues}"/>
  </div>
  <DefaultLoading v-else/>
</template>

<script lang="ts" setup>
import {onMounted, ref, computed} from "vue";

import {DonutChart} from '@/components/ui/chart-donut';
import {BarChart} from '@/components/ui/chart-bar';
import {getSprintCollection} from "@/services/api/sprint.service.api.ts";
import {getIssueCollection} from "@/services/api/issus.service.api.ts";
import {IssueInterface} from "@/interface/issus.interface.ts";
import {inboxColumns} from "@/views/private/inbox/components/inbox.columns.ts";
import {responseDataDefault} from "@/data/default/response.data.default.ts";
import IssusDataTable from "@/components/table/IssusDataTable.vue";
import DefaultLoading from "@/components/ui/loading/DefaultLoading.vue";
import {issuesDataDefault} from "@/data/default/issues.data.default.ts";
import {SprintInterface} from "@/interface/sprint.interface.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";

const isLoading = ref<boolean>(false)
const issues = ref<IssueInterface[]>([issuesDataDefault])
const sprint = ref<SprintInterface>(defaultSprint)
const dataSumVal = ref<{
  totalStoryPoints: number,
  highPriorityCount: number
}>({
  totalStoryPoints: 0,
  highPriorityCount: 0
});

const columns = inboxColumns()

const loadIssues = async () => {
  try {
    isLoading.value = true
    const sprints = await getSprintCollection({})
    issues.value = await getIssueCollection({
      sprint: sprints[0]['@id'],
    })
    sprint.value = sprints[0]

    dataSumVal.value.totalStoryPoints = issues.value.reduce((sum, issue) => sum + (issue.storyPoint || 1), 0)
    dataSumVal.value.highPriorityCount = issues.value.filter(issue => issue.priority.name === "Critical").length
  } catch (error) {
    console.error('Error loading issues:', error)
  } finally {
    isLoading.value = false
  }
}

const tagsData = computed(() => {
  const weightedData = new Map<string, number>();

  issues.value.forEach(issue => {
    const storyPoints = issue.storyPoint || 1;

    if (issue.labels && issue.labels.length > 0) {
      issue.labels.forEach(label => {
        const labelName = label.name || 'Sans étiquette';
        weightedData.set(labelName, (weightedData.get(labelName) || 0) + storyPoints);
      });
    } else {
      weightedData.set('Sans étiquette', (weightedData.get('Sans étiquette') || 0) + storyPoints);
    }
  });

  return Array.from(weightedData.entries()).map(([name, total]) => ({name, total}));
});

const priorityData = computed(() => {
  const weightedData = new Map<string, number>();

  issues.value.forEach(issue => {
    const storyPoints = issue.storyPoint || 1;
    const priority = issue.priority.name.toUpperCase() ? issue.priority.name.toUpperCase() : 'MEDIUM';

    weightedData.set(priority, (weightedData.get(priority) || 0) + storyPoints);
  });

  return Array.from(weightedData.entries()).map(([name, total]) => ({name, total}));
});

const tagColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'];

const valueFormatter = (value: number) => `${value} pts`;

onMounted(async () => {
  await loadIssues()
})
</script>
