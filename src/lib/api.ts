import axios from 'axios'
export const api = axios.create({
    baseURL: '/', // here i will use the backend url
    headers: {
        "Content-Type": "application/json"
    }
})