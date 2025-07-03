"use client"
import secureLocalStorage from "react-secure-storage";
import { useState, useEffect, useRef } from 'react'

import { getCookie } from '@/utils/cookies'
import useInfo from "@/hooks/useInfo";
import api from "@/utils/api";

import Navbar from "@/components/ui/Navbar"
import Form from "@/components/ui/Form";
import Modal from "@/components/ui/Modal";

import { IoCloseSharp, IoLogOutSharp, IoMenuSharp, IoMoon } from "react-icons/io5"

export default function Layout({ children }: { children: React.ReactNode }) {

    const { info, handleInfo, handleClearInfo } = useInfo();
    const [is_authenticated, setAuthenticated] = useState<boolean>(false)
    const [menu_mobile_open, set_menu_mobile_open] = useState<boolean>(false);
    const [menu_account_open, set_menu_account_open] = useState<boolean>(false);
    const [modal_confirm_logout_open, set_modal_confirm_logout_open] = useState<boolean>(false);

    const accountMenuRef = useRef<HTMLDivElement>(null);

    const getAuthenticated = async () => {
        const authenticated = await getCookie("authenticated")
        if (authenticated === "true") {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }

    const handleMenuMobile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set_menu_mobile_open(!menu_mobile_open);
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
            secureLocalStorage.removeItem("token");
            setTimeout(() => { window.location.href = "/login" }, 1000);
        } catch (error: any) {
            handleInfo({ isLoading: false, isError: true, message: error.response.data.message });
            handleClearInfo();
        }
    }

    const handleModalConfirmLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set_modal_confirm_logout_open(!modal_confirm_logout_open);
    }

    useEffect(() => {
        getAuthenticated()
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (menu_account_open && accountMenuRef.current && !accountMenuRef.current.contains(target)) {
                set_menu_account_open(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => { document.removeEventListener("click", handleClickOutside); };
    }, [menu_account_open])

    return (
        <>
            <Navbar>
                <Navbar.Items direction="row" className="md:hidden">
                    <Navbar.ActionButton onClick={handleMenuMobile} className="md:hidden">
                        <IoMenuSharp className="w-4 h-4" />
                    </Navbar.ActionButton>
                </Navbar.Items>
                <Navbar.Items direction="row" className="hidden md:flex gap-4">
                    <Navbar.ItemLink name="Home" href="/" />
                    <Navbar.ItemLink name="About" href="/" />
                    <Navbar.ItemLink name="Project" href="/" />
                    <Navbar.ItemLink name="Contact" href="/" />
                </Navbar.Items>
                <Navbar.Items direction="row">
                    <Navbar.ActionButton>
                        <IoMoon className="w-4 h-4" />
                    </Navbar.ActionButton>
                    {is_authenticated && <Navbar.AvatarButton is_active={menu_account_open} onClick={handleMenuAccount} />}
                </Navbar.Items>
            </Navbar>

            <div ref={accountMenuRef}>
                <Navbar.AvatarNavigation
                    is_active={menu_account_open}
                    name="John Doe"
                    profile_link="#"
                    item_link={[
                        { name: "account", link: "/account" },
                        { name: "settings", link: "#" },
                    ]}
                    handleLogout={handleModalConfirmLogout}
                />
            </div>

            {menu_mobile_open && (
                <div className="fixed top-0 z-10 w-full h-full md:hidden flex flex-col justify-center items-center gap-4 bg-black/70">
                    <Navbar.ItemLink name="Home" href="/" />
                    <Navbar.ItemLink name="About" href="/" />
                    <Navbar.ItemLink name="Project" href="/" />
                    <Navbar.ItemLink name="Contact" href="/" />
                    <Navbar.ActionButton onClick={handleMenuMobile}>
                        <IoCloseSharp className="w-4 h-4 text-white" />
                    </Navbar.ActionButton>
                </div>
            )}

            <Modal width="sm" is_active={modal_confirm_logout_open} handle_close={handleModalConfirmLogout} modal_title="logout">
                <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
                    {info.message && <Form.Response isError={info.isError} message={info.message} />}
                    <IoLogOutSharp className="w-32 h-32 text-black" />
                    <button onClick={handleLogout} className="w-full h-10 rounded-sm hover:cursor-pointer bg-rose-500 text-white">
                        Yes, I want to logout
                    </button>
                </div>
            </Modal>

            <main className="w-full pt-14 pb-4 px-4 xl:px-9 flex justify-center items-center bg-white">
                <div className="w-full max-w-screen-xl flex flex-col">
                    {children}
                </div>
            </main>
        </>
    )
}