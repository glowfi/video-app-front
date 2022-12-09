import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://video-app-back.onrender.com/api/'
});
