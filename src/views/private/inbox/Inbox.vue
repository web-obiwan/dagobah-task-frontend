<template>
<DefaultDataTable :columns="columns" :data="mockIssusData">
   
  </DefaultDataTable>
  </template>

<script lang="ts" setup>
import {inboxColumns} from "@/views/private/inbox/components/columns";
import {mockIssusData} from "@/mock/issus.mock";

const columns = inboxColumns();
</script>



