import { XiorInstance, XiorInterceptorRequestConfig, XiorError } from 'xior';
import { useSecurityStore } from '@/store/auth.ts';

export function createAxiosRequestInterceptor(instance: XiorInstance): void {
    instance.interceptors.request.use(
        (config: XiorInterceptorRequestConfig): XiorInterceptorRequestConfig => {
            const tokenPromise = useSecurityStore().tokenPromise;
            
            if (tokenPromise) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${tokenPromise}`,
                };
            }
            
            return config;
        },
        (error: XiorError) => Promise.reject(error)
    );
}

export function createAxiosResponseInterceptor(XiorInstance: XiorInstance): void {
    XiorInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: XiorError) => {
            const originalConfig = error.config;
            if (error.response && (error.response.status === 401 || error.response.status === 500) && originalConfig && error.config) {
                if (error.config.url?.includes('token/refresh_user_api')) {
                    useSecurityStore().logout();
                    window.location.assign('/');
                    throw error;
                } else {
                    try {
                        await useSecurityStore().refreshToken();
                        
                        return XiorInstance.request(originalConfig);
                    } catch (e) {
                        console.error(e);
                        throw error;
                    }
                }
            }
            throw error;
        }
    );
}
