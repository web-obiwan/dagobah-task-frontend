import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
//import {useSecurityStore} from '@/store/auth.ts';

import Inbox from "@/views/private/inbox/Inbox.vue";
import IssusCreate from "@/views/private/issus/IssusCreate.vue";
import IssusEdit from "@/views/private/issus/IssusEdit.vue";
import IssusList from "@/views/private/issus/IssusList.vue";
import MilestonesCreate from "@/views/private/milestones/MilestonesCreate.vue";
import MilestonesEdit from "@/views/private/milestones/MilestonesEdit.vue";
import MilestonesList from "@/views/private/milestones/MilestonesList.vue";
import ProjectCreate from "@/views/private/project/ProjectCreate.vue";
import ProjectEdit from "@/views/private/project/ProjectEdit.vue";
import ProjectList from "@/views/private/project/ProjectList.vue";
import Setting from "@/views/private/settings/Setting.vue";
import Login from "@/views/public/login/Login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'Inbox',
                component: Inbox,
                meta: {
                    breadcrumb: 'Inbox',
                },
            },
        ],
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: {
            breadcrumb: 'Setting',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/issus',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Issus',
        },
        children: [
            {
                path: '',
                name: 'IssusList',
                component: IssusList,
                meta: {
                    breadcrumb: 'Issus list',
                },
            },
            {
                path: '/add',
                name: 'IssusCreate',
                component: IssusCreate,
                meta: {
                    breadcrumb: 'Create issus',
                },
            },
            {
                path: '/:id/edit',
                name: 'IssusEdit',
                component: IssusEdit,
                meta: {
                    breadcrumb: 'Edit issue',
                }
            },
        ]
    },
    {
        path: '/sprint',
        component: () => import('@/components/layout/DefaultLayout.vue'),
        meta: {
            breadcrumb: 'Sprint',
        },
        children: [
            {
                path: '',
                name: 'MilestonesList',
                component: MilestonesList,
                meta: {
                    breadcrumb: 'Sprint list',
                }
            },
            {
                path: '/add',
                name: 'MilestonesCreate',
                component: MilestonesCreate,
                meta: {
                    breadcrumb: 'Create sprint',
                }
            },
            {
                path: '/:id/edit',
                name: 'MilestonesEdit',
                component: MilestonesEdit,
                meta: {
                    breadcrumb: 'Edit sprint',
                }
            },
        ]
    },
    {
        path: '/project',
        children: [
            {
                path: '',
                name: 'ProjectList',
                component: ProjectList,
            },
            {
                path: '/add',
                name: 'ProjectCreate',
                component: ProjectCreate,
            },
            {
                path: '/:id/edit',
                name: 'ProjectEdit',
                component: ProjectEdit,
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
/*
router.beforeEach((to, _from, next) => {
    const isAuthenticated = useSecurityStore().isAuthenticated;
    
    if (to.path === '/') {
        next();
    } else if (!isAuthenticated) {
        next('/');
    } else {
        next();
    }
});
*/

export default router;
