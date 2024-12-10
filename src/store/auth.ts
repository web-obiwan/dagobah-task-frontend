import {defineStore} from 'pinia'
import AuthenticationService from "@/services/auh.service.ts";
import {jwtDecode} from "jwt-decode";

interface User {
    exp: number,
    iat: number,
    roles: string[],
    username: string,
    refreshTokenPromise: string,
    tokenPromise: string,
}

interface SecurityState {
    authenticated: boolean;
    user: User | object;
    refreshTokenPromise: string | null;
    tokenPromise: string | null;
}

export const useSecurityStore = defineStore('security', {
    state: (): SecurityState => ({
        authenticated: false,
        user: {},
        refreshTokenPromise: null,
        tokenPromise: null,
    }),
    getters: {
        isAuthenticated: (state) => state.authenticated,
        getUser: (state) => state.user,
        getToken: (state) => state.tokenPromise,
        getRefreshToken: (state) => state.refreshTokenPromise
    },
    actions: {
        saveTokens(this: SecurityState, accessToken: string, refreshToken: string) {
            this.authenticated = true;
            this.tokenPromise = accessToken;
            this.refreshTokenPromise = refreshToken;
            this.user = jwtDecode(accessToken);
        },
        logout(this: SecurityState) {
            this.authenticated = false;
            this.tokenPromise = null;
            this.refreshTokenPromise = null;
            this.user = {};
        },
        refreshToken(this: SecurityState) {
            return AuthenticationService.refreshToken()
        }
    },
    persist: true
})
