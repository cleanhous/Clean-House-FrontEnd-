import axios from "axios";

const api = axios.create({
    baseURL: 'https://7885-177-37-139-34.ngrok-free.app/'
})

export default api;