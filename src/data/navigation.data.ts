import {Module, Link} from '@/interface/navigation.interface.ts';

export const modulesData: Module[] = [
    {
        label: 'Client',
        subLabel: 'Gestion client',
        icon: 'lucide:square-user-round',
        url: '/',
    },
    {
        label: 'Utilisateur',
        subLabel: 'Gestion utilisateur Cortex',
        icon: 'lucide:user',
        url: '/',
    },
    {
        label: 'Mailing',
        subLabel: 'Envoie d\'email et SMS aux clients',
        icon: 'lucide:send',
        url: '/',
    }
]

export const linksData: Link[] = [
    {
        title: 'Inbox',
        icon: 'lucide:inbox',
        to: {name: 'Inbox'},
        isActive: true,
        items: [],
    },
    {
        title: 'Issus',
        icon: 'lucide:focus',
        isActive: true,
        items: [
            {
                title: 'Issus',
                to: {name: 'IssusList'},
            },
            {
                title: 'Create Issus',
                to: {name: 'IssusCreate'},
            },
        ],
    },
    {
        title: 'Sprints',
        icon: 'lucide:square-kanban',
        isActive: false,
        items: [
            {
                title: 'Sprint',
                to: {name: 'MilestonesList'},
            },
            {
                title: 'Create sprint',
                to: {name: 'MilestonesCreate'},
            },
        ],
    },
    {
        title: 'Projects',
        icon: 'lucide:layout-grid',
        isActive: false,
        items: [
            {
                title: 'Projects',
                to: {name: 'ProjectList'},
            },
            {
                title: 'Create project',
                to: {name: 'ProjectCreate'},
            },
        ],
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
