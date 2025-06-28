"use client";
import { useState } from "react";
import api from "@/utils/api";

import ResponseMessage from "@/components/ui/ResponseMessage";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Page() {

    const [info, setInfo] = useState<{ isLoading: boolean, isError: boolean, message: string }>({
        isLoading: false,
        isError: false,
        message: ""
    });

    const [credentials, setCredentials] = useState<{ name: string, email: string; password: string; confirm_password: string }>({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleInfo = async ({ isLoading, isError, message }: { isLoading: boolean, isError: boolean, message: string }) => {
        setInfo({ isLoading, isError, message });
    }

    const handleClearInfo = async () => {
        setTimeout(() => { setInfo({ isLoading: false, isError: false, message: "" }) }, 3000);
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleInfo({ isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/register", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                confirm_password: credentials.confirm_password,
            });
            const data = await response.data;
            await handleInfo({ isLoading: false, isError: false, message: data.message });
            await handleClearInfo();
            setCredentials({ name: "", email: "", password: "", confirm_password: "" });
            setTimeout(() => { window.location.href = "/login" }, 3000);
        } catch (error: any) {
            await handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            await handleClearInfo();
        }
    }

    return (
        <>
            <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
                {info.message && <ResponseMessage isError={info.isError} message={info.message} />}

                <Input
                    required
                    autoFocus
                    id="name"
                    type="text"
                    label="Name"
                    isLoading={info.isLoading}
                    isError={info.isError}
                    value={credentials.name}
                    onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                />

                <Input
                    required
                    autoFocus
                    id="email"
                    type="email"
                    label="Email"
                    isLoading={info.isLoading}
                    isError={info.isError}
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />

                <Input
                    required
                    autoFocus
                    id="password"
                    type="password"
                    label="Password"
                    isLoading={info.isLoading}
                    isError={info.isError}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />

                <Input
                    required
                    autoFocus
                    id="confirm_password"
                    type="password"
                    label="Confirm Password"
                    isLoading={info.isLoading}
                    isError={info.isError}
                    value={credentials.confirm_password}
                    onChange={(e) => setCredentials({ ...credentials, confirm_password: e.target.value })}
                />

                <Button id="btn-register" type="submit" isLoading={info.isLoading} className="bg-black hover:bg-gray-800 text-white">
                    {info.isLoading ? "Loading..." : "Register"}
                </Button>
            </form>
        </>
    )
}