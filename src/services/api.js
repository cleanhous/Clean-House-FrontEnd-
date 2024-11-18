import axios from "axios";

const api = axios.create({
    baseURL: 'https://backend-production-ce19.up.railway.app/'
})

export default api;