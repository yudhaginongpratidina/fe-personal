"use client";
import secureLocalStorage from "react-secure-storage";

import useInfo from "@/hooks/useInfo";
import { useState, useEffect, useRef } from "react";
import api from "@/utils/api";

import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";

import { IoMoon, IoLogOutSharp, IoHome } from "react-icons/io5";
import { SiOpenproject } from "react-icons/si";
import { MdAllInbox } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {

    const { info, handleInfo, handleClearInfo } = useInfo();
    const [menu_sidebar_open, set_menu_sidebar_open] = useState<boolean>(false);
    const [menu_account_open, set_menu_account_open] = useState<boolean>(false);
    const [modal_confirm_logout_open, set_modal_confirm_logout_open] = useState<boolean>(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const accountMenuRef = useRef<HTMLDivElement>(null);

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
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                menu_sidebar_open &&
                sidebarRef.current &&
                !sidebarRef.current.contains(target)
            ) {
                set_menu_sidebar_open(false);
            }

            if (
                menu_account_open &&
                accountMenuRef.current &&
                !accountMenuRef.current.contains(target)
            ) {
                set_menu_account_open(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menu_sidebar_open, menu_account_open]);

    return (
        <>
            <Navbar>
                <Navbar.Items direction="row">
                    <Navbar.Hamburger is_active={menu_sidebar_open} onClick={handleMenuSidebar} />
                    <Navbar.SayHello>hi there</Navbar.SayHello>
                </Navbar.Items>
                <Navbar.Items direction="row">
                    <Navbar.ActionButton>
                        <IoMoon className="w-4 h-4" />
                    </Navbar.ActionButton>
                    <Navbar.AvatarButton is_active={menu_account_open} onClick={handleMenuAccount} />
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

            <div ref={sidebarRef}>
                <Sidebar is_active={menu_sidebar_open} handle_close={handleMenuSidebar}>
                    <Sidebar.ItemLink name="home" href="/" icon={<IoHome className="w-4 h-4" />} />
                    <Sidebar.ItemLink name="inbox" href="/" icon={<MdAllInbox className="w-4 h-4" />} />
                    <Sidebar.ItemDropdown
                        name="portfolio"
                        icon={<SiOpenproject className="w-4 h-4" />}
                        items={[
                            { name: "portfolio", href: "/" },
                            { name: "category", href: "/" },
                        ]}
                    />
                    <Sidebar.ItemDropdown
                        name="users"
                        icon={<FaUsers className="w-4 h-4" />}
                        items={[
                            { name: "users", href: "/" },
                            { name: "role and permission", href: "/" },
                        ]}
                    />
                </Sidebar>
            </div>

            <Modal width="sm" is_active={modal_confirm_logout_open} handle_close={handleModalConfirmLogout} modal_title="logout">
                <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
                    {info.message && <Form.Response isError={info.isError} message={info.message} />}
                    <IoLogOutSharp className="w-32 h-32 text-black" />
                    <button onClick={handleLogout} className="w-full h-10 rounded-sm hover:cursor-pointer bg-rose-500 text-white">
                        Yes, I want to logout
                    </button>
                </div>
            </Modal>

            <main className="w-full flex justify-center pt-16">
                <div className="w-full max-w-screen-xl px-4 xl:px-0">
                    {children}
                </div>
            </main>
        </>
    );
}