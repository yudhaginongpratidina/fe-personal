"use server"
import { cookies } from 'next/headers'

const getCookie = async (name: string) => {
    const cookie = cookies();
    return (await cookie).get(name)?.value;
}

export { getCookie }