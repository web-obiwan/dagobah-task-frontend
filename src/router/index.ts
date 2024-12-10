import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {useSecurityStore} from '@/store/auth.ts';

import HelloWord from '@/views/HelloWord.vue';

const routes:  Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'HelloWord',
        component: HelloWord,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

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


export default router;
