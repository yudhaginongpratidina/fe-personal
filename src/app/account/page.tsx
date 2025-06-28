"use client";
import { useState } from "react";
import api from "@/utils/api";
import { deleteCookie } from "@/utils/cookies";

import ResponseMessage from "@/components/ui/ResponseMessage";
import Button from "@/components/ui/Button";

export default function Page() {

    const [info, setInfo] = useState<{ isLoading: boolean, isError: boolean, message: string }>({ isLoading: false, isError: false, message: "" });

    const handleInfo = async ({ isLoading, isError, message }: { isLoading: boolean, isError: boolean, message: string }) => {
        setInfo({ isLoading, isError, message });
    }

    const handleClearInfo = async () => {
        setTimeout(() => { setInfo({ isLoading: false, isError: false, message: "" }) }, 3000);
    }

    const handleRefreshToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await handleInfo({ isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/token");
            const data = await response.data;
            await handleInfo({ isLoading: false, isError: false, message: data.message });
            await handleClearInfo();
        } catch (error: any) {
            await handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            await handleClearInfo();
        }
    }

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await handleInfo({ isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/logout");
            const data = await response.data;
            await handleInfo({ isLoading: false, isError: false, message: data.message });
            await handleClearInfo();
            await deleteCookie("authenticated");
            await deleteCookie("refresh_token");
            setTimeout(() => { window.location.href = "/login" }, 1000);
        } catch (error: any) {
            await handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            await handleClearInfo();
        }
    }

    return (
        <>
            {info.message && <ResponseMessage isError={info.isError} message={info.message} />}
            <Button onClick={handleRefreshToken} id="btn-refresh-token" type="button" isLoading={info.isLoading} className="bg-black hover:bg-gray-800 text-white">
                Refresh Token
            </Button>
            <Button onClick={handleLogout} id="btn-logout" type="button" isLoading={info.isLoading} className="bg-red-500 hover:bg-red-600 text-white">
                Logout
            </Button>
        </>
    )
}