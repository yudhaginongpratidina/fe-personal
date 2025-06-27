"use client";
import { useState } from "react";
import api from "@/utils/api";

export default function Page() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [credentials, setCredentials] = useState<{ email: string; password: string; }>({
        email: "",
        password: "",
    });
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post("/auth/login", {
                email: credentials.email,
                password: credentials.password,
            });
            const data = await response.data;
            setIsError(false);
            setIsLoading(false);
            setMessage(data.message);
            setLoggedIn(true);
            setCredentials({ email: "", password: "" });
        } catch (error: any) {
            setIsLoading(false);
            setIsError(true);
            setMessage(error.response.data.message);
        }
    }

    const handleRefreshToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post("/auth/token");
            const data = await response.data;
            setIsError(false);
            setIsLoading(false);
            setMessage(data.message);
        } catch (error: any) {
            setIsLoading(false);
            setIsError(true);
            setMessage(error.response.data.message);
        }
    }

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post("/auth/logout");
            const data = await response.data;
            setIsError(false);
            setIsLoading(false);
            setMessage(data.message);
            setLoggedIn(false);
        } catch (error: any) {
            setIsLoading(false);
            setIsError(true);
            setMessage(error.response.data.message);
        }
    }

    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
                {(isError && message) && (
                    <div className="w-full h-12 px-2.5 flex items-center rounded-sm bg-red-500 text-white">
                        {message}
                    </div>
                )}
                {(!isError && message) && (
                    <div className="w-full h-12 px-2.5 flex items-center rounded-sm bg-green-500 text-white">
                        {message}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-12 px-2.5 border rounded-sm border-gray-400 focus:border-gray-800 focus:outline-none duration-150"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="******"
                    className="w-full h-12 px-2.5 border rounded-sm border-gray-400 focus:border-gray-800 focus:outline-none duration-150"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit" className="w-full h-12 px-2.5 rounded-sm bg-black hover:bg-gray-800 text-white duration-150">
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>

            {loggedIn && (
                <div className="w-full max-w-sm flex flex-col gap-4">
                    <button onClick={handleRefreshToken} className="w-full h-12 px-2.5 rounded-sm bg-blue-500 text-white">
                        Refresh Token
                    </button>
                    <button onClick={handleLogout} className="w-full h-12 px-2.5 rounded-sm bg-red-500 text-white">
                        Log out
                    </button>
                </div>
            )}
        </main>
    )
}