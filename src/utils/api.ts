import axios, { AxiosInstance} from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND;

const api: AxiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

export default api;