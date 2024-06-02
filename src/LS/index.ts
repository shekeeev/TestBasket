import { CardModules } from "../Store/Modules"

export const setLS = (item: CardModules[]) => {
    localStorage.setItem('basket', JSON.stringify(item))
}

export const getLS = () => {
    return localStorage.getItem('basket')
}

export const removeLS = () => {
    localStorage.removeItem('basket')
}

