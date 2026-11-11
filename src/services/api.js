import axios from 'axios';

// Khởi tạo một bản sao của Axios với cấu hình mặc định
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Trỏ thẳng vào Backend Node.js
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor: Tự động kẹp Token vào mỗi request nếu user đã đăng nhập
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;