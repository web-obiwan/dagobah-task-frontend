import xior from 'xior';
import {createAxiosRequestInterceptor, createAxiosResponseInterceptor} from '@/plugin/xior/api.interceptors.ts';
import cachePlugin from 'xior/plugins/cache';

const instance = xior.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

instance.plugins.use(
    cachePlugin({
        enableCache: false,
        cacheItems: 100,
        cacheTime: 1e3 * 60 * 5,
    })
);

createAxiosRequestInterceptor(instance);
createAxiosResponseInterceptor(instance);

export default instance;