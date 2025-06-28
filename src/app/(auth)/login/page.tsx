"use client";
import { useState } from "react";
import api from "@/utils/api";

import ResponseMessage from "@/components/ui/ResponseMessage";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Page() {

    const [info, setInfo] = useState<{ isLoading: boolean, isError: boolean, message: string }>({ isLoading: false, isError: false, message: "" });
    const [credentials, setCredentials] = useState<{ email: string; password: string; }>({ email: "", password: "" });

    const handleInfo = async ({ isLoading, isError, message }: { isLoading: boolean, isError: boolean, message: string }) => {
        setInfo({ isLoading, isError, message });
    }

    const handleClearInfo = async () => {
        setTimeout(() => { setInfo({ isLoading: false, isError: false, message: "" })}, 3000);
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleInfo({ isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/login", {
                email: credentials.email,
                password: credentials.password,
            });
            const data = await response.data;
            await handleInfo({ isLoading: false, isError: false, message: data.message });
            await handleClearInfo();
            setCredentials({ email: "", password: "" });
            setTimeout(() => { window.location.href = "/account" }, 2000);
        } catch (error: any) {
            await handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            await handleClearInfo();
        }
    }


    return (
        <>
            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
                {info.message && <ResponseMessage isError={info.isError} message={info.message} />}
                <Input id="email" type="email" label="Email" required autoFocus isLoading={info.isLoading} isError={info.isError} value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                <Input id="password" type="password" label="Password" required isLoading={info.isLoading} isError={info.isError} value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <Button id="btn-login" type="submit" isLoading={info.isLoading} className="bg-black hover:bg-gray-800 text-white">
                    {info.isLoading ? "Loading..." : "Login"}
                </Button>
            </form>
        </>
    )
}