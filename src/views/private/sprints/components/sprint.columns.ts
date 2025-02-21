import { h } from 'vue'
import { ColumnDef } from '@tanstack/vue-table'
import {SprintInterface} from "@/interface/sprint.interface.ts";
import { useDateFormat } from '@vueuse/core'

export const sprintColumns = (): ColumnDef<SprintInterface>[] => [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Nom'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'begunAt',
        header: () => h('div', { class: 'text-left' }, 'Begun'),
        cell: ({row}) => {
            const sprint = row.original;
            return h('div', {class: ''}, useDateFormat(new Date(sprint.begunAt), 'DD/MM/YYYY').value)
        },
    },
    {
        accessorKey: 'endedAt',
        header: () => h('div', { class: 'text-left' }, 'Ended'),
        cell: ({row}) => {
            const sprint = row.original;
            return h('div', {class: ''}, useDateFormat(new Date(sprint.endedAt), 'DD/MM/YYYY').value)
        },
    },
]
