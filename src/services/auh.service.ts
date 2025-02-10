import xior from 'xior';
import {createAxiosResponseInterceptor} from '@/plugin/xior/api.interceptors';
import {TokenResponse, LoginData} from "@/interface/response.auth.interface.ts";
import {useSecurityStore} from "@/store/auth.ts";

const axiosInstance = xior.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
});

createAxiosResponseInterceptor(axiosInstance);

class AuthenticationError extends Error {
    errorCode: number;

    constructor(errorCode: number, message: string) {
        super(message);
        this.name = 'AuthenticationError';
        this.errorCode = errorCode;
    }
}

interface AuthenticationServiceType {
    login(data: LoginData): Promise<boolean>;
    logout(): Promise<boolean>;
    refreshToken(): Promise<boolean>;
}

const AuthenticationService: AuthenticationServiceType = {
    /**
     * Login function.
     * @param data Login credentials
     * @returns Promise<boolean> indicating success or failure
     */
    login: async function(this: any, data: LoginData): Promise<boolean> {
        try {
            const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/login_check`, data);
            const responseData = response.data as TokenResponse;
            localStorage.setItem("userT", JSON.stringify(responseData.user));


            useSecurityStore().saveTokens(responseData.token, responseData.refresh_token);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    /**
     * Logout the current user by removing the token from storage.
     */
    logout: function(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                useSecurityStore().logout();

                const requestData = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    url: import.meta.env.VITE_API_URL + '/api/token/refresh',
                    data: '{}',
                };

                axiosInstance.request(requestData)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((error) => {
                        console.error('Logout API error:', error);
                        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                        reject(false);
                    });
            } catch (error) {
                console.error('Unexpected error during logout:', error);
                // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                reject(false);
            }
        });
    },

    /**
     * Refresh the access token.
     */
    refreshToken: async function(): Promise<boolean> {
        const data = {
            refresh_token: useSecurityStore().getRefreshToken
        }

        const requestData = {
            method: 'post',
            headers: [
                'Content-Type: application/json'
            ],
            url: import.meta.env.VITE_API_URL + '/api/token/refresh',
            data: JSON.stringify(data)
        };

        try {
            const response = await axiosInstance.request(requestData);
            const responseData = response.data as TokenResponse;

            useSecurityStore().saveTokens(responseData.token, responseData.refresh_token);

            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    },
}

export default AuthenticationService;
export {AuthenticationService, AuthenticationError};