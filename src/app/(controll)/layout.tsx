"use client";
import useInfo from "@/hooks/useInfo";
import { useState } from "react";
import api from "@/utils/api";
import Link from "next/link";

import { MdSupportAgent } from "react-icons/md";
import { IoMenuSharp, IoMoon, IoLogOut } from "react-icons/io5";
import { IoMdClose, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function Layout({ children }: { children: React.ReactNode }) {

    const { info, handleInfo, handleClearInfo } = useInfo();
    const [menu_sidebar_open, set_menu_sidebar_open] = useState<boolean>(false);
    const [menu_account_open, set_menu_account_open] = useState<boolean>(false);

    const handleMenuSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set_menu_sidebar_open(!menu_sidebar_open);
    }

    const handleMenuAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set_menu_account_open(!menu_account_open);
    }

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            handleInfo({ isLoading: true, isError: false, message: "" });
            const response = await api.post("/auth/logout");
            const data = await response.data;
            handleInfo({ isLoading: false, isError: false, message: data.message });
            handleClearInfo();
            setTimeout(() => { window.location.href = "/login" }, 1000);
        } catch (error: any) {
            handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            handleClearInfo();
        }
    }

    return (
        <>
            <div className="fixed top-0 z-10 w-full h-12 px-4 border-b border-gray-200 flex justify-center items-center bg-white">
                <nav className="w-full max-w-screen-xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button onClick={handleMenuSidebar} className="hover:cursor-pointer">
                            {menu_sidebar_open ? <IoMdClose className="w-8 h-8" /> : <IoMenuSharp className="w-8 h-8" />}
                        </button>
                        <h1 className="text-md uppercase font-medium">hi there</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-sm flex justify-center items-center hover:cursor-pointer bg-black text-white">
                            <IoMoon className="w-4 h-4" />
                        </button>
                        <button onClick={handleMenuAccount} className="w-8 h-8 relative rounded-sm hover:cursor-pointer flex items-center gap-0.5 bg-gray-600">
                            {menu_account_open ? <IoMdArrowDropup className="w-4 h-4 absolute -right-4" /> : <IoMdArrowDropdown className="w-4 h-4 absolute -right-4" />}
                        </button>
                    </div>
                </nav>
            </div>

            {menu_account_open && (
                <div className="fixed top-16 z-10 w-full px-4 flex justify-center items-center">
                    <div className="w-full max-w-screen-xl flex justify-end">
                        <div className="w-full md:max-w-xs p-2 flex flex-col gap-1 rounded-sm border border-gray-200 bg-white">
                            <div className="w-full p-2 flex items-start gap-2">
                                <div className="min-w-12 min-h-12 max-w-12 max-h-12 rounded-sm bg-gray-600" />
                                <div className="w-full">
                                    <h1 className="text-sm font-medium uppercase">John Doe</h1>
                                    <Link href="/" className="text-sm font-bold text-blue-500">view profile</Link>
                                </div>
                            </div>
                            <hr className="w-full border-gray-200" />
                            <Link href={"/account"} className="w-full h-9 rounded-sm flex items-center px-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100 duration-150">
                                My Account
                            </Link>
                            <div className="w-full h-9 rounded-sm flex items-center px-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100 duration-150">
                                Settings
                            </div>
                            <hr className="w-full border-gray-200" />
                            <div className="w-full h-9 rounded-sm flex items-center gap-2.5 px-1.5 text-sm font-medium hover:cursor-pointer hover:bg-gray-100 duration-150">
                                <MdSupportAgent className="w-5 h-5" />
                                <span>Support Center</span>
                            </div>
                            <button onClick={handleLogout} className="w-full h-9 rounded-sm flex items-center gap-2.5 px-1.5 text-sm font-medium hover:cursor-pointer hover:bg-gray-100 duration-150">
                                <IoLogOut className="w-6 h-6" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}