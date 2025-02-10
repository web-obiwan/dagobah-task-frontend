import {
    Inbox,
    Clock,
    PlayCircle,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    AlertCircle,
    Info,
} from 'lucide-vue-next'

export const ISSUS_STATUS = {
    BACKLOG: 'BACKLOG',
    PLANNED: 'PLANNED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
} as const

export const ISSUS_PRIORITY = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
} as const

export const STATUS_CONFIG = {
    [ISSUS_STATUS.BACKLOG]: {
        label: 'Backlog',
        icon: Inbox,
        variant: 'secondary',
        color: 'text-slate-500',
        value: ISSUS_STATUS.BACKLOG
    },
    [ISSUS_STATUS.PLANNED]: {
        label: 'Planifié',
        icon: Clock,
        variant: 'outline',
        color: 'text-blue-500',
        value: ISSUS_STATUS.PLANNED
    },
    [ISSUS_STATUS.IN_PROGRESS]: {
        label: 'En cours',
        icon: PlayCircle,
        variant: 'default',
        color: 'text-yellow-500',
        value: ISSUS_STATUS.IN_PROGRESS
    },
    [ISSUS_STATUS.COMPLETED]: {
        label: 'Terminé',
        icon: CheckCircle2,
        variant: 'default',
        color: 'text-green-500',
        value: ISSUS_STATUS.COMPLETED
    },
    [ISSUS_STATUS.CANCELED]: {
        label: 'Annulé',
        icon: XCircle,
        variant: 'destructive',
        color: 'text-red-500',
        value: ISSUS_STATUS.CANCELED
    }
} as const

export const PRIORITY_CONFIG = {
    [ISSUS_PRIORITY.HIGH]: {
        label: 'Haute',
        icon: AlertTriangle,
        color: 'text-red-500',
        value: ISSUS_PRIORITY.HIGH
    },
    [ISSUS_PRIORITY.MEDIUM]: {
        label: 'Moyenne',
        icon: AlertCircle,
        color: 'text-yellow-500',
        value: ISSUS_PRIORITY.MEDIUM
    },
    [ISSUS_PRIORITY.LOW]: {
        label: 'Basse',
        icon: Info,
        color: 'text-blue-500',
        value: ISSUS_PRIORITY.LOW
    }
} as const
