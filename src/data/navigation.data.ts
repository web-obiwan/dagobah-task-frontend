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
        title: 'Dashboard',
        icon: 'lucide:square-user-round',
        to: {name: 'Dashboard'},
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
