import axios from "axios";
import { CardModules, UserModules } from "../Store/Modules";

const instanse = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
})


export const authApi = {
    addCardAll() {
        return instanse.get(`/products`)
    },
    addCardSingle(id: string) {
        return instanse.get(`/products/${id}`)
    },
    addUserData(userData: UserModules) {
        return instanse.post(`/auth/login`, userData)
    },
    addUserToken(token: string) {
        const headers = { Authorization: `Bearer ${token}` }
        return instanse.get(`/users/`, { headers })
    },



}
