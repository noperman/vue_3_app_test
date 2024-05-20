import { authStore } from "@/stores/auth";
import axios, { type AxiosInstance } from "axios";

const MyAPI: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MY_API_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

MyAPI.interceptors.request.use(
    function (config) {
        const token = authStore().token;

        if (token) Object.assign(config, {
            params: { token }
        })

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// MyAPI.defaults.adapter = require('axios/lib/adapters/xhr');

export default {
    MyAPI
}