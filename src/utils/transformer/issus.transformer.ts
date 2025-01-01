import { h } from 'vue'
import { Badge } from '@/components/ui/badge'
import { STATUS_CONFIG, PRIORITY_CONFIG, ISSUS_STATUS, ISSUS_PRIORITY } from '@/constants/issus.constants'

export type IssusStatus = keyof typeof ISSUS_STATUS
export type IssusPriority = keyof typeof ISSUS_PRIORITY

interface SelectItem {
    label: string
    value: string
    icon?: any
}

export const issusStatusTransformer = {
    toSelectItems(): SelectItem[] {
        return Object.values(STATUS_CONFIG).map(status => ({
            label: status.label,
            value: status.value,
            icon: status.icon
        }))
    },

    toDisplayElement(status: IssusStatus) {
        const config = STATUS_CONFIG[status]
        if (!config) return h('div', {}, status)

        return h('div', { class: 'flex items-center gap-2 justify-center' }, [
            h(config.icon, { class: `h-4 w-4 ${config.color}` }),
            h(Badge, {
                variant: config.variant,
                class: `${config.color}`
            }, () => config.label)
        ])
    },

    getLabel(status: IssusStatus): string {
        return STATUS_CONFIG[status]?.label || status
    },

    getStyle(status: IssusStatus) {
        const config = STATUS_CONFIG[status]
        return {
            color: config?.color || '',
            variant: config?.variant || 'secondary'
        }
    }
}

export const issusPriorityTransformer = {
    toSelectItems(): SelectItem[] {
        return Object.values(PRIORITY_CONFIG).map(priority => ({
            label: priority.label,
            value: priority.value,
            icon: priority.icon
        }))
    },

    toDisplayElement(priority: IssusPriority) {
        const config = PRIORITY_CONFIG[priority]
        if (!config) return h('div', {}, priority)

        return h('div', { class: 'flex items-center gap-2 justify-center' }, [
            h(config.icon, { class: `h-4 w-4 ${config.color}` }),
            h('span', { class: `font-medium ${config.color}` }, config.label)
        ])
    },

    getLabel(priority: IssusPriority): string {
        return PRIORITY_CONFIG[priority]?.label || priority
    },

    getStyle(priority: IssusPriority) {
        return {
            color: PRIORITY_CONFIG[priority]?.color || ''
        }
    }
}
