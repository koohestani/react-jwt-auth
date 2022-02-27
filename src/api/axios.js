import axios from 'axios';

// TODO: read from env,
const BASE_URL = 'http://localhost:3500';

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
