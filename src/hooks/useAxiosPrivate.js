import { useEffect } from 'react';

import { axiosPrivate } from '../api/axios';
import { useAuth } from '../contexts/authContext';
import { authService } from '../services/authService';

const useAxiosPrivate = () => {
    const { user, refresh, logout } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (config.headers['x-access-token']) return config;
                config.headers['x-access-token'] = user?.accessToken;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error?.response?.status !== 401)
                    return Promise.reject(error);

                const prevReq = error?.config;
                if (prevReq?.sent) {
                    logout();
                    return Promise.reject(error);
                }

                try {
                    prevReq.sent = true;
                    const { status, data } = await authService.refreshToken(user?.refreshToken);
                    if (status === 200)
                        refresh(data);
                    prevReq.headers['x-access-token'] = data?.accessToken;
                    return axiosPrivate(prevReq);
                } catch (error) {
                    logout();
                    return Promise.reject(error);
                }
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
