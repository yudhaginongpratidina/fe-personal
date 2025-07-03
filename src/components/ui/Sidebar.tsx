"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io";
import { IoArrowForwardSharp } from "react-icons/io5";

interface SidebarProps {
    is_active: boolean;
    handle_close: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}


interface ItemLinkProps {
    name: string;
    href: string;
    icon: React.ReactNode;
}


interface ItemDropdownProps {
    name: string;
    icon: React.ReactNode;
    items: { name: string; href: string }[];
}


export default function Sidebar({ is_active, handle_close, children }: SidebarProps) {
    return (
        <>
            {is_active && (
                <aside className="fixed top-0 z-10 w-full md:max-w-[280px] border-r border-gray-200 min-h-screen bg-white">
                    <div className="w-full h-12 px-4 flex justify-between items-center border-b border-gray-200">
                        <div className="w-8 h-8 rounded-sm bg-gray-400" />
                        <button onClick={handle_close} className="3xl:hidden hover:cursor-pointer">
                            <IoMdClose className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="w-full p-2.5 flex flex-col gap-2">
                        {children}
                    </div>
                </aside>
            )}
        </>
    )
}


const ItemLink = ({ name, href, icon }: ItemLinkProps) => {
    return (
        <Link href={href} className="w-full">
            <div className="w-full h-12 px-2.5 flex items-center rounded-sm hover:bg-gray-100 gap-2">
                {icon && (
                    <div className="w-7 h-7 rounded-sm flex justify-center items-center bg-black text-white">
                        {icon}
                    </div>
                )}
                <span className="capitalize font-medium">
                    {name}
                </span>
            </div>
        </Link>
    )
}


const ItemDropdown = ({ name, icon, items }: ItemDropdownProps) => {
    const [is_active, set_is_active] = useState<boolean>(false);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set_is_active(!is_active);
    };

    const ButtonClass = "w-full h-12 px-2.5 flex justify-between items-center rounded-sm hover:bg-gray-100 gap-2";
    const IconClass = "w-7 h-7 rounded-sm flex justify-center items-center bg-black text-white";
    const ItemLinkClass = "w-full h-12 px-2.5 flex items-center rounded-sm hover:bg-gray-100 gap-2"

    return (
        <div className="w-full">
            <button onClick={handleToggle} className={ButtonClass}>
                <div className="flex items-center gap-2">
                    {icon && <div className={IconClass}>{icon}</div>}
                    <span className="capitalize font-medium">{name}</span>
                </div>
                {is_active ? <IoMdArrowDropup className="w-5 h-5" /> : <IoMdArrowDropdown className="w-5 h-5" />}
            </button>

            {items && is_active && (
                <div className="w-full flex flex-col gap-2 mt-2">
                    {items.map((item, index) => (
                        <Link key={index} href={item.href} className={ItemLinkClass}>
                            <IoArrowForwardSharp className="w-4 h-4" />
                            <span className="capitalize font-medium">{item.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};



Sidebar.ItemLink = ItemLink
Sidebar.ItemDropdown = ItemDropdown