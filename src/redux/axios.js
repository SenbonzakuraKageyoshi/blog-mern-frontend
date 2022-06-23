import axios from 'axios';

const instance = axios.create({
    baseURl: 'http://localhost:5000'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;