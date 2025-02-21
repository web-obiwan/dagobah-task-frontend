<template>
  <div class="h-full w-full">
    <TooltipProvider :delay-duration="0">
      <DefaultSidebar :defaultLayout="defaultLayout" :links="linksData" >
        <main>
          <router-view/>
        </main>
      </DefaultSidebar>
    </TooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import {TooltipProvider} from '@/components/ui/tooltip'
import DefaultSidebar from "@/components/navigation/DefaultSidebar.vue";
import {linksData} from '@/data/navigation.data.ts';

const defaultLayout: number[] = [265, 440, 655]
</script>
