import {Link} from '@/interface/navigation.interface.ts';

export const linksData: Link[] = [
    {
        title: 'Inbox',
        icon: 'lucide:inbox',
        to: {name: 'Inbox'},
        isActive: true,
        items: [],
    },
    {
        title: 'Issues',
        icon: 'lucide:focus',
        to: {name: 'IssusList'},
        isActive: true,
        items: [],
    },
    {
        title: 'Projects',
        icon: 'lucide:layout-grid',
        to: {name: 'ProjectList'},
        isActive: true,
        items: [],
    },
    {
        title: 'Sprints',
        icon: 'lucide:square-kanban',
        to: {name: 'SprintsList'},
        isActive: true,
        items: [],
    },
    {
        title: 'Statistics',
        icon: 'lucide:chart-no-axes-combined',
        to: {name: 'Stats'},
        isActive: true,
        items: [],
    },
    {
        title: 'Gantt',
        icon: 'lucide:chart-no-axes-gantt',
        to: {name: 'Gantt'},
        isActive: true,
        items: [],
    },
]

// Exemple of navigation data for sidebar
/*export const linksData: Link[] = [
    {
        title: 'Client',
        icon: 'lucide:square-user-round',
        to: {name: 'ClientList'},
        isActive: true,
        items: [],
    },
    {
        title: 'Créer un client',
        icon: 'lucide:circle-plus',
        to: {name: 'ClientCreate'},
        isActive: true,
        items: [],
    },
    {
        title: 'Playground',
        icon: 'lucide:circle-plus',
        isActive: true,
        items: [
            {
                title: 'History',
                to: {name: 'ClientCreate'},
            },
            {
                title: 'Starred',
                to: {name: 'ClientCreate'},
            },
            {
                title: 'Settings',
                to: {name: 'ClientCreate'},
            },
        ],
    },
]*/
