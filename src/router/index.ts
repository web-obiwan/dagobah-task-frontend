import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {useSecurityStore} from '@/store/auth.ts';

import Inbox from "@/views/private/inbox/Inbox.vue";

import IssusEdit from "@/views/private/issus/IssusEdit.vue";
import IssusList from "@/views/private/issus/IssusList.vue";

import SprintsCreate from "@/views/private/sprints/SprintsCreate.vue";
import SprintsEdit from "@/views/private/sprints/SprintsEdit.vue";
import SprintsList from "@/views/private/sprints/SprintsList.vue";

import ProjectEdit from "@/views/private/projects/ProjectEdit.vue";
import ProjectList from "@/views/private/projects/ProjectList.vue";

import Stats from "@/views/private/stats/Stats.vue";

import Gantt from "@/views/private/gantt/Gantt.vue";

import Setting from "@/views/private/settings/Setting.vue";

import Login from "@/views/public/login/Login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            public: true // Route publique
        }
    },
    {
        path: '/',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            requiresAuth: true // Route privée
        },
        children: [
            {
                path: '',
                name: 'Inbox',
                component: Inbox,
                meta: {
                    breadcrumb: 'Inbox',
                    requiresAuth: true
                },
            },
        ],
    },
    {
        path: '/settings',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Setting',
                component: Setting,
                meta: {
                    breadcrumb: 'Settings',
                    requiresAuth: true
                },
            },
        ],
    },
    {
        path: '/issus',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Issus',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'IssusList',
                component: IssusList,
                meta: {
                    breadcrumb: 'Issus list',
                    requiresAuth: true
                },
            },
            {
                path: '/:id/edit',
                name: 'IssusEdit',
                component: IssusEdit,
                meta: {
                    breadcrumb: 'Edit issue',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/sprint',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Sprint',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'SprintsList',
                component: SprintsList,
                meta: {
                    breadcrumb: 'Sprint list',
                    requiresAuth: true
                }
            },
            {
                path: '/add',
                name: 'SprintsCreate',
                component: SprintsCreate,
                meta: {
                    breadcrumb: 'Create sprint',
                    requiresAuth: true
                }
            },
            {
                path: '/:id/edit',
                name: 'SprintsEdit',
                component: SprintsEdit,
                meta: {
                    breadcrumb: 'Edit sprint',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/project',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Project',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'ProjectList',
                component: ProjectList,
                meta: {
                    breadcrumb: 'Project list',
                    requiresAuth: true
                },
            },
            {
                path: '/:id/edit',
                name: 'ProjectEdit',
                component: ProjectEdit,
                meta: {
                    breadcrumb: 'Edit project',
                    requiresAuth: true
                },
            },
        ]
    },
    {
        path: '/stats',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Statistics',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Stats',
                component: Stats,
                meta: {
                    breadcrumb: 'Statistics',
                    requiresAuth: true
                },
            }
        ]
    },
    {
        path: '/gantt',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Gantt',
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Gantt',
                component: Gantt,
                meta: {
                    breadcrumb: 'Gantt',
                    requiresAuth: true
                },
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const isAuthenticated = useSecurityStore().isAuthenticated;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isPublic = to.matched.some(record => record.meta.public);

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (isPublic && isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
