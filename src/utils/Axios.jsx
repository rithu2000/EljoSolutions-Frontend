import axios from 'axios';

export const userApi = axios.create({
    baseURL: 'http://localhost:8000/api'
});

userApi.interceptors.request.use((req) => {
    const token = localStorage.getItem('employeeToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});