<template>
  <div class="flex flex-col lg:flex-row lg:items-end lg:space-x-2 space-y-2 mb-5">
    <Button
        class="w-fit p-2"
        variant="outline"
        @click="() => router.go(-1)"
    >
      <ChevronLeft class="w-4 h-4"/>
    </Button>
    <Title class="lg:text-left text-center">{{title}}</Title>
  </div>
</template>

<script setup lang="ts">
import {Title} from "@/components/ui/text";
import {ChevronLeft} from "lucide-vue-next";
import {useRouter} from "vue-router";
import {Button} from "@/components/ui/button";

const router = useRouter()

defineProps<{
  title: string;
}>()
</script>
