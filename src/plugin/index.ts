import { App } from 'vue';
import router from '@/router';
import pinia from '@/store';

export function registerPlugins(app: App) {
    app
        .use(router)
        .use(pinia)
}
