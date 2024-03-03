import axios from 'axios';

export const userApi = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

userApi.interceptors.request.use((req) => {
    const token = localStorage.getItem('employeeToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});