"use server"
// Conjunto de funciones de API relacionadas a los usuarios

import { baseAuthFetch, getCookiesJson } from "./baseApi"

// TODO: Los tipos de datos deberian ser mas especificos.
// Ej: Convertir las fechas de string a fechas e indicar
// los campos que pueden ser nulos
export type User = {
    created_at: string
    date_joined: string
    email: string
    first_name: string
    id: number
    is_active: boolean
    is_staff: boolean
    is_superuser: boolean
    last_login: string
    last_name: string
    rating: number
    rating_count: number
    role: string
    username: string
}

export async function getCurrentUserData(): Promise<User> {
    const {user_id} = (await getCookiesJson()) as {user_id: Number}
    return getUserData(user_id)
}

export async function getUserData(user_id:Number): Promise<User> {    
    return await baseAuthFetch(
        `accounts/${user_id}`,
        "GET"
    ).then((r) => r.json())
}
