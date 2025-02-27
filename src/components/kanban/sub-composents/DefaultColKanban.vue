<template>
  <Card class="col-span-1 h-full">
    <CardHeader class="flex flex-row items-center justify-start space-x-2 pb-3">
      <component
          :is="issusStatusTransformer(issuStatus).icon"
          :class="cn('w-5 h-5', issusStatusTransformer(issuStatus).color)"
      />
      <SubTitle class="text-md">
        {{ issusStatusTransformer(issuStatus).name }}
      </SubTitle>
      <p class="text-sm opacity-40">
        {{ data?.length || 0 }}
      </p>
    </CardHeader>
    <CardContent class="p-3">
      <draggable
          v-model="data"
          :animation="200"
          class="space-y-2 w-full h-full min-h-60"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <RouterLink
              :to="{
              name: 'IssusEdit',
              params: { id: element.id }
            }"
              class="block"
          >
            <div
                class="dark:bg-neutral-950 bg-white shadow-sm border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
            >
              <div class="flex flex-col space-y-2">
                <div class="flex items-start justify-between">
                  <p class="text-[0.6rem] opacity-40 -mb-2">{{ element.reference }} - {{ element.project.name }} -
                    {{ element.owner?.username }}</p>
                  <div class="flex items-center space-x-2">
                    <ColorStoryPoint :storyPoint="element.storyPoint"/>
                  <component
                      :is="issuesPriorityTransformer(element.priority.name).icon"
                      :class="cn('w-4 h-4', issuesPriorityTransformer(element.priority.name).color)"
                  />
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <component
                      :is="issusStatusTransformer(element.status).icon"
                      :class="cn('w-4 h-4', issusStatusTransformer(element.status).color)"
                  />
                  <p class="text-sm">{{ element.name }}</p>
                </div>
              </div>
              <p class="font-semibold text-[0.65rem] opacity-40 truncate">{{ element.description }}</p>
              <div class="flex justify-between items-center space-x-2">
                <div class="flex flex-wrap gap-1 mt-2">
               <span
                   v-for="label in element.labels"
                   :key="label"
                   :class="getLabelStyle(label.name)"
                   class="px-2 py-0.5 rounded-full text-[0.6rem] font-medium"
               >
                  {{ label.name }}
                </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </template>
      </draggable>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import {useVModel} from "@vueuse/core";
import {defineEmits, defineProps, watch} from "vue";
import {issusStatusTransformer} from "@/utils/transformer/status.transformer.utils";
import {IssueInterface, IssuesStatus} from "@/interface/issus.interface.ts";
import {SubTitle} from "@/components/ui/text";
import {Card, CardContent, CardHeader,} from '@/components/ui/card'
import {cn} from '@/lib/utils'
import {getLabelStyle} from "@/utils/transformer/label.transformer.utils";
import {RouterLink} from 'vue-router';
import {updateIssue} from "@/services/api/issus.service.api.ts";
import {issuesPriorityTransformer} from "@/utils/transformer/priority.transformer.utils.ts";
import ColorStoryPoint from "@/components/other/ColorStoryPoint.vue";

const props = defineProps<{
  data?: IssueInterface[]
  issuStatus: IssuesStatus;
}>();

const emits = defineEmits<{
  (e: "update:data", payload: IssueInterface[]): void;
}>();

const data = useVModel(props, 'data', emits);

async function handleIssueUpdate(id: string | number, status: IssuesStatus) {
  await updateIssue(id, {
    "status": status,
  })
}

watch(data, async (newValue) => {
  if (newValue) {
    for (const issue of newValue) {
      if (issue.status !== props.issuStatus) {
        await handleIssueUpdate(issue.id, props.issuStatus)
        issue.status = props.issuStatus;
      }
    }
  }
}, {deep: true});
</script>
