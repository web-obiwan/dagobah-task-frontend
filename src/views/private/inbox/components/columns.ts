import {h} from 'vue'
import {ColumnDef} from '@tanstack/vue-table'
import type {Issus} from "@/interface/issus.interface.ts";

export const inboxColumns = (): ColumnDef<Issus>[] => [
    {
        accessorKey: 'name',
        header: () => h('div', {class: 'text-right'}, 'Nom'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('name'))
        },
    },
    {
        accessorKey: 'description',
        header: () => h('div', {class: 'text-right'}, 'Description'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('description'))
        },
    },
    {
        accessorKey: 'status',
        header: () => h('div', {class: 'text-right'}, 'Status'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('status'))
        },
    },
    {
        accessorKey: 'priority',
        header: () => h('div', {class: 'text-right'}, 'Priority'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('priority'))
        },
    },
    {
        accessorKey: 'project',
        header: () => h('div', {class: 'text-right'}, 'Project'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('project'))
        },
    },
    {
        accessorKey: 'sprint',
        header: () => h('div', {class: 'text-right'}, 'Sprint'),
        cell: ({row}) => {
            return h('div', {class: 'text-right font-medium'}, row.getValue('sprint'))
        },
    },
]

