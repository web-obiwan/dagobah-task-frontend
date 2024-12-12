import xior from 'xior';
import {createAxiosResponseInterceptor} from '@/plugin/xior/api.interceptors';
import {TokenResponse} from "@/interface/response.auth.interface.ts";
import {useSecurityStore} from "@/store/auth.ts";


const axiosInstance = xior.create({
  baseURL: import.meta.env.VITE_API_URL as string,
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
  logout(): Promise<boolean>;
  refreshToken(): Promise<boolean>;
}


const AuthenticationService: AuthenticationServiceType = {
  
  /**
   * Logout the current user by removing the token from storage.
   */
  logout: function (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        useSecurityStore().logout();
        
        const requestData = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          url: import.meta.env.VITE_API_URL + '/token/refresh_user_api',
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
  refreshToken: async function (): Promise<boolean> {
    const data = {
      refresh_token: useSecurityStore().getRefreshToken
    }
    
    const requestData = {
      method: 'post',
      headers: [
        'Content-Type: application/json'
      ],
      url: import.meta.env.VITE_API_URL + '/token/refresh_user_api',
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
};

export default AuthenticationService;
export {AuthenticationService, AuthenticationError};
