<template>
  <div class="w-full overflow-scroll lg:overflow-visible">
    <div v-if="!nbrPage" class="flex lg:flex-row flex-col lg:justify-between lg:items-center py-4 space-y-2">
      <Input
          v-model="globalFilter"
          class="max-w-sm"
          placeholder="Rechercher..."
      />
      <slot/>
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                  v-if="!header.isPlaceholder" :props="header.getContext()"
                  :render="header.column.columnDef.header"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
                v-for="row in table.getRowModel().rows" :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <div
                    v-if="cell.id.split('_')[1] !== 'actions' && cell.id.split('_')[1] !== 'false'"
                    class="flex items-center space-x-2 cursor-pointer"
                    @click="handleCopy(cell.row.getUniqueValues(cell.column.id)[0] as string)"
                    @mouseenter="showIcon(`copy-icon-${cell.id}`)"
                    @mouseleave="hideIcon(`copy-icon-${cell.id}`)"
                >
                  <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
                  <Copy
                      v-if="!isCopy"
                      :data-icon-id="`copy-icon-${cell.id}`"
                      style="visibility: hidden;"
                      class="w-3 h-3 opacity-45 transition"
                  />
                  <Check
                      v-if="isCopy"
                      :data-icon-id="`copy-icon-${cell.id}`"
                      style="visibility: hidden;"
                      class="w-3 h-3 opacity-45 transition"
                  />
                </div>
                <FlexRender v-else :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
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
    <div v-if="dataResponse?.view?.next" class="flex items-center justify-end py-4 space-x-2">
      <Button
          :disabled="getNumberOfPagination(dataResponse?.view?.next) <= 2"
          size="sm"
          variant="outline"
          @click="updateParentNbrPage(nbrPageLocal - 1)"
      >
        Précédent
      </Button>
      <Text>{{ nbrPageLocal + ' - ' + getNumberOfPagination(dataResponse?.view?.last) }}</Text>
      <Button
          :disabled="getNumberOfPagination(dataResponse?.view?.next) > getNumberOfPagination(dataResponse?.view?.last)"
          size="sm"
          variant="outline"
          @click="updateParentNbrPage(nbrPageLocal + 1)"
      >
        Suivant
      </Button>
    </div>
  </div>
</template>

<script generic="TData, TValue" lang="ts" setup>
import {defineEmits, defineProps, ref, watch} from 'vue';
import {
  ColumnDef,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable
} from '@tanstack/vue-table'
import {ResponseInterface} from "@/interface/response-api.interface";
import {Check, Copy} from 'lucide-vue-next';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {Button} from '@/components/ui/button'
import {Text} from '@/components/ui/text'

import {toast} from "@/components/ui/toast";
import {Input} from "@/components/ui/input";

export interface Response extends ResponseInterface {
  member: any[];
}

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  dataResponse: Response;
  nbrPage?: number;
}>();


const nbrPageLocal = ref(props.nbrPage || 0);
const isCopy = ref<boolean>(false);
const globalFilter = ref<string>("");

const table = useVueTable({
  get data() {
    return props.dataResponse.member
  },
  get columns() {
    return props.columns
  },
  getFilteredRowModel: getFilteredRowModel(),
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 30,
    },
  }

})

const showIcon = (iconId: string) => {
  const element = document.querySelector(`[data-icon-id="${iconId}"]`) as HTMLElement;
  if (element) {
    element.style.visibility = 'visible';
  }
};

const hideIcon = (iconId: string) => {
  const element = document.querySelector(`[data-icon-id="${iconId}"]`) as HTMLElement;
  if (element) {
    element.style.visibility = 'hidden';
  }
};

const handleCopy = (value: string) => {
  navigator.clipboard.writeText(value)
  isCopy.value = true
  toast({
    title: `Donnée copiée : ${value}`,
  });
  setTimeout(async () => {
    isCopy.value = false
  }, 350);
}

const getNumberOfPagination = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('&page=')[1])
  } else {
    return 100
  }
}

const emit = defineEmits(['updateNbrPage']);

const updateParentNbrPage = (value: number) => {
  nbrPageLocal.value = value;
  emit('updateNbrPage', nbrPageLocal.value);
};

watch(globalFilter, (newValue) => {
  table.setGlobalFilter(newValue);
});
</script>
