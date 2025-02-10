<template>
  <AlertDialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="w-8 h-8 p-0" variant="ghost">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel v-if="menuLabel">{{ menuLabel }}</DropdownMenuLabel>
        <DropdownMenuSeparator v-if="menuLabel"/>
        <template v-for="(item, index) in menuItems" :key="index">
          <DropdownMenuItem
              v-if="item.type === 'item' && item.label !== 'Archiver'"
              :class="item.class || ''"
              @click="item.action"
          >
            {{ item.label }}
          </DropdownMenuItem>
          <DropdownMenuItem
              v-else-if="item.type === 'item' && item.label === 'Archiver'"
              :class="item.class || ''"
              @click="() => open = true"
          >
            {{ item.label }}
          </DropdownMenuItem>
          <DropdownMenuSeparator v-else-if="item.type === 'separator'"/>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog v-model:open="open">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir archiver ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="() => open = false">Annuler</Button>
          <Button variant="destructive" @click="handleArchiveAction">
            Archiver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </AlertDialog>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MoreHorizontal} from 'lucide-vue-next';
import {AlertDialog,} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const open = ref(false);

const props = defineProps<{
  menuLabel?: string;
  menuItems: Array<{
    type: 'item' | 'separator';
    label?: string;
    action?: () => void;
    class?: string;
  }>;
}>();

const handleArchiveAction = () => {
  const archiveItem = props.menuItems.find(item => item.label === 'Archiver' && item.action);
  if (archiveItem && archiveItem.action) {
    archiveItem.action();
  }
};
</script>
