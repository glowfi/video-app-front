import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://utube-video-app.herokuapp.com/api/'
});
