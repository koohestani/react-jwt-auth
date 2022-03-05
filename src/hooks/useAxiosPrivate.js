import { useEffect } from 'react';

import { axiosPrivate } from '../api/axios';
import { useAuth } from '../contexts/authContext';
import { authService } from '../services/authService';

const useAxiosPrivate = () => {
    const { user, refresh, logout } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (config.headers['Authorization']) return config;

                config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response?.status !== 403 || prevReq?.sent) {
                    logout();
                    return Promise.reject(error);
                }

                prevReq.sent = true;
                const response = await authService.refreshToken();
                refresh(response);

                prevReq.headers[
                    'Authorization'
                ] = `Bearer ${user?.accessToken}`;

                return axiosPrivate(prevReq);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [user, refresh, logout]);

    return axiosPrivate;
};

export default useAxiosPrivate;
