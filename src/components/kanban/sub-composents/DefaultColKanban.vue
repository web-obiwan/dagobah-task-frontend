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
              class="dark:bg-zinc-950 bg-white shadow-sm border rounded-md p-3 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <span class="font-semibold">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </CardContent>
    <CardFooter class="p-3">
      <Button class="w-full flex justify-center items-center" variant="outline" size="icon">
        <Plus class="w-4 h-4" />
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import {useVModel} from "@vueuse/core";
import {defineProps, defineEmits} from "vue";
import {issusStatusTransformer} from "@/utils/transformer/status.transformer.utils";
import {IssusStatusType} from "@/interface/issus.interface.ts";
import {SubTitle} from "@/components/ui/text";
import {Plus} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
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