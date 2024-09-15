import axios from "axios";

const cep = axios.create({
    baseURL: 'viacep.com.br/ws/'
})

export default cep