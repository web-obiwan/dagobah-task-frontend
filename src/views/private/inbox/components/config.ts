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

export const statusConfig = {
    backlog: {
        label: 'Backlog',
        icon: Inbox,
        variant: 'secondary',
        color: 'text-slate-500'
    },
    planned: {
        label: 'Planifié',
        icon: Clock,
        variant: 'outline',
        color: 'text-blue-500'
    },
    in_progress: {
        label: 'En cours',
        icon: PlayCircle,
        variant: 'default',
        color: 'text-yellow-500'
    },
    completed: {
        label: 'Terminé',
        icon: CheckCircle2,
        variant: 'default',
        color: 'text-green-500'
    },
    canceled: {
        label: 'Annulé',
        icon: XCircle,
        variant: 'destructive',
        color: 'text-red-500'
    }
}

export const priorityConfig = {
    high: {
        label: 'Haute',
        icon: AlertTriangle,
        color: 'text-red-500'
    },
    medium: {
        label: 'Moyenne',
        icon: AlertCircle,
        color: 'text-yellow-500'
    },
    low: {
        label: 'Basse',
        icon: Info,
        color: 'text-blue-500'
    }
}
