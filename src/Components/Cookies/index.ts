import { getCookie, removeCookie, setCookie } from "typescript-cookie"

export const setCookiesToken = (token: string) => {
    setCookie('token', token)
}

export const getCookiesToken = () => {
    return getCookie('token')
}

export const removeCookiesToken = () => {
    removeCookie('token', { path: '' })

}