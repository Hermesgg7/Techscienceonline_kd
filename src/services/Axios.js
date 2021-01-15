import axios from 'axios';
// import GLOBAL from "../global";
import logService from "./LogService";

let axiosInstance = axios.create({
    responseType: "json",
    // headers: {
    //     'Cache-Control': 'no-cache',
    //     'Pragma': 'no-cache',
    //     'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    // }
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

axiosInstance.interceptors.request.use(function (config) {
    // const token = GLOBAL.BASE_TOKEN;
    // config.headers.Authorization = `Basic ${token}`;

    return config;
}, error => {
    logService.log(error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    if (process.env.NODE_ENV === 'production') {
        const { error } = response;
        if (error) {
            logService.log(error);
            return Promise.reject(error);
        }

        return response.data;
    }

    return response.data;
}, error => {
    logService.log(error);
    return Promise.reject(error);
});

export default axiosInstance;
