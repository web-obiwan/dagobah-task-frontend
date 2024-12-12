import {Module, Link} from '@/interface/navigation.interface.ts';

// Repositories favoris de l'utilisateur
export const modulesData: Module[] = [
    {
        label: 'Frontend App',
        subLabel: 'Application frontend principale',
        icon: 'lucide:layout-template',
        url: '/repository/1',
        repoId: 1,
        isFavorite: true
    },
    {
        label: 'Backend API',
        subLabel: 'API principale',
        icon: 'lucide:server',
        url: '/repository/2',
        repoId: 2,
        isFavorite: true
    },
    {
        label: 'Shared Library',
        subLabel: 'Composants et utilitaires partagés',
        icon: 'lucide:library',
        url: '/repository/3',
        repoId: 3,
        isFavorite: true
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
        to: {name: 'IssusList'},
        isActive: true,
        items: [],
    },
    { title: 'Projects',
        icon: 'lucide:layout-grid',
        to: {name: 'ProjectList'},
        isActive: true,
        items: [],
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
