import { h } from 'vue'
import { ColumnDef } from '@tanstack/vue-table'
import {IssueInterface} from "@/interface/issus.interface.ts"
import { issusStatusTransformer } from '@/utils/transformer/status.transformer.utils.ts'
import DefaultIconTextCell from "@/components/table/DefaultIconTextCell.vue";
import {issuesPriorityTransformer} from "@/utils/transformer/priority.transformer.utils.ts";

export const inboxColumns = (): ColumnDef<IssueInterface>[] => [
    {
        accessorKey: 'reference',
        header: () => h('div', { class: 'text-left' }, 'Référence'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('reference'))
        },
    },
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Nom'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'false',
        header: () => h('div', { class: 'text-left' }, 'Description'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left text-muted-foreground truncate max-w-[300px]' }, row.getValue('description'))
        },
    },
    {
        id: 'false',
        enableHiding: false,
        header: () => h('div', { class: 'text-center' }, 'Statut'),
        cell: ({row}) => {
            const issus = row.original;
            return h('div', {class: ''}, h(DefaultIconTextCell, {
                data: issusStatusTransformer(issus.status),
            }));
        }
    },
    {
        accessorKey: 'false',
        header: () => h('div', { class: 'text-center' }, 'Priorité'),
        cell: ({row}) => {
            const issus = row.original;
            return h('div', {class: ''}, h(DefaultIconTextCell, {
                data: issuesPriorityTransformer(issus.priority.name),
            }));
        }
    },
    {
        accessorKey: 'false',
        header: () => h('div', { class: 'text-left' }, 'Projet'),
        cell: ({ row }) => {
            const issus = row.original;
            return h('div', { class: 'text-left font-medium' }, issus.project.name)
        },
    },
    {
        accessorKey: 'false',
        header: () => h('div', { class: 'text-left' }, 'Assigné à'),
        cell: ({ row }) => {
            const data = row.original;
            const assignee = data.owner;
            return h('div', { class: 'flex items-center gap-2' }, [
                h('img', {
                    src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee?.username || 'kenobi'}`,
                    alt: assignee?.username,
                    class: 'h-6 w-6 rounded-full'
                }),
                h('span', {}, assignee?.username)
            ])
        },
    },
]
