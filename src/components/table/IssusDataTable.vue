<template>
  <div>
    <div class="flex justify-between items-center py-4">
      <Input
          v-model="globalFilter"
          class="max-w-sm"
          placeholder="Rechercher..."
      />
      <slot />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                  v-if="!header.isPlaceholder"
                  :props="header.getContext()"
                  :render="header.column.columnDef.header"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
                v-for="row in table.getRowModel().rows as any"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
                @click="router.push({ name: 'IssusEdit', params: { id: row.original.id } })"
                class="cursor-pointer"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Aucune donnée trouvée...
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script generic="TData, TValue" lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();
const globalFilter = ref<string>("");

let table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getFilteredRowModel: getFilteredRowModel(),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

watch(globalFilter, (newValue) => {
  table.setGlobalFilter(newValue);
});

watch(props.data, () => {
  table = useVueTable({
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
});
</script>
