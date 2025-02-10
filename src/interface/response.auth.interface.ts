export interface TokenResponse {
    token: string;
    refresh_token: string;
    user: {
        id: number;
        username: string;
        roles: string[];
    }
}

export interface LoginData {
    username: string;
    password: string;
}