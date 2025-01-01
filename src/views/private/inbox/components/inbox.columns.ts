import { h } from 'vue'
import { ColumnDef } from '@tanstack/vue-table'
import type { Issus, Project } from "@/interface/issus.interface.ts"
import { issusStatusTransformer } from '@/utils/transformer/status.transformer.utils.ts'
import DefaultIconTextCell from "@/components/table/DefaultIconTextCell.vue";
import {issuesPriorityTransformer} from "@/utils/transformer/priority.transformer.utils.ts";

export const inboxColumns = (): ColumnDef<Issus>[] => [
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
        accessorKey: 'description',
        header: () => h('div', { class: 'text-left' }, 'Description'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left text-muted-foreground truncate max-w-[300px]' }, row.getValue('description'))
        },
    },
    {
        id: 'status',
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
        accessorKey: 'priority',
        header: () => h('div', { class: 'text-center' }, 'Priorité'),
        cell: ({row}) => {
            const issus = row.original;
            return h('div', {class: ''}, h(DefaultIconTextCell, {
                data: issuesPriorityTransformer(issus.priority),
            }));
        }
    },
    {
        accessorKey: 'project',
        header: () => h('div', { class: 'text-left' }, 'Projet'),
        cell: ({ row }) => {
            const project = row.getValue('project')
            if (!project) {
                return h('div', { class: 'flex items-center gap-2' }, 'No project')
            }
            const typedProject = project as Project
            return h('div', { class: 'flex items-center gap-2' }, [
                typedProject.icon ? h(typedProject.icon, { class: 'h-4 w-4' }) : null,
                h('span', {}, typedProject.name)
            ])
        },
    },
    {
        accessorKey: 'assignee',
        header: () => h('div', { class: 'text-left' }, 'Assigné à'),
        cell: ({ row }) => {
            const assignee = row.original;
            return h('div', { class: 'flex items-center gap-2' }, [
                h('img', {
                    src: 'https://github.com/shadcn.png',
                    alt: assignee.name,
                    class: 'h-6 w-6 rounded-full'
                }),
                h('span', {}, assignee.name)
            ])
        },
    },
    /*{
        accessorKey: 'labels',
        header: () => h('div', { class: 'text-left' }, 'Labels'),
        cell: ({ row }) => {
            const labels = row.getValue('labels')
            return h('div', { class: 'flex gap-1 flex-wrap' },
                labels.map((label: string) =>
                    h(Badge, {
                        variant: 'outline',
                        class: 'text-xs'
                    }, label)
                )
            )
        },
    },*/
]
