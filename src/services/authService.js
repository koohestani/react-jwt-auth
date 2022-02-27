import { axiosPublic } from '../api/axios';

export const authService = {
    refreshToken: (token) => {
        return axiosPublic.post('/api/auth/refreshtoken', {
            refreshToken: token,
        });
    },

    register: (data) => {
        return axiosPublic.post(
            '/api/auth/signup',
            {
                ...data,
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
    },

    login: (data) => {
        return axiosPublic.post(
            '/api/auth/signin',
            {
                ...data,
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
    },
};
