import axios from 'axios';
import { BASE_URL } from '../../settings.json';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(async (config) => {
    try {
        const token = localStorage.getItem('token');
        if (token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {}
    return config;
});

instance.interceptors.response.use(
    (response) => {
        if(response.data !== null && response.data.login !== undefined && response.data.login === true){
            window.location = '/login';
        }
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
