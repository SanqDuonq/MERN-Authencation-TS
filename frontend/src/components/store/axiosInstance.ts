import axios from "axios";

const API_URL = 'https://mern-authencation-ts.vercel.app/api/auth';
// const API_URL_LOCAL = 'http://localhost:5000/api/auth'
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;