<template>
  <Card class="col-span-1 h-full">
    <CardHeader class="flex flex-row items-center justify-start space-x-2 pb-3">
      <component
          :is="issusStatusTransformer(issuStatus).icon"
          :class="cn('w-5 h-5', issusStatusTransformer(issuStatus).color)"
      />
      <SubTitle>
        {{ issusStatusTransformer(issuStatus).name }}
      </SubTitle>
    </CardHeader>
    <CardContent class="p-3">
      <draggable
          v-model="data"
          :animation="200"
          class="space-y-2 w-full h-full"
          group="tasks"
          itemKey="id"
      >
        <template #item="{ element }">
          <div
              class="dark:bg-slate-950 bg-white shadow-sm border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
          >
            <div class="flex flex-col space-y-2">
              <div class="flex items-center space-x-2">
                <SaveIcon class="w-4 h-4"/>
                <p class="font-semibold text-sm">{{ element.name }}</p>
              </div>
            </div>
            <p class="font-semibold text-[0.65rem] opacity-40 truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet
              lectus ut mauris semper tempor non in ante. Donec purus magna, aliquam in est id.</p>
          </div>
        </template>
      </draggable>
    </CardContent>
    <CardFooter class="p-3">
      <Button class="w-full flex justify-center items-center" size="icon" variant="outline">
        <Plus class="w-4 h-4"/>
      </Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import {useVModel} from "@vueuse/core";
import {defineEmits, defineProps} from "vue";
import {issusStatusTransformer} from "@/utils/transformer/status.transformer.utils";
import {IssusStatusType} from "@/interface/issus.interface.ts";
import {SubTitle} from "@/components/ui/text";
import {Plus, SaveIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader,} from '@/components/ui/card'
import {cn} from '@/lib/utils'

const props = defineProps<{
  data?: Array<{ name: string; id: number }>;
  issuStatus: IssusStatusType;
}>();

const emits = defineEmits<{
  (e: "update:data", payload: Array<{ name: string; id: number }>): void;
}>();

const data = useVModel(props, "data", emits, {
  passive: true,
  defaultValue: [],
});
</script>
