import Link from "next/link"

import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"

interface NavbarProps {
    children: React.ReactNode
}


interface ItemsProps {
    children: React.ReactNode
    direction: "column" | "row"
}


interface HamburgerProps extends React.HTMLAttributes<HTMLButtonElement> {
    is_active: boolean
}


interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}


interface AvatarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    is_active: boolean
}


interface AvatarNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
    is_active: boolean;
    name: string;
    profile_link: string;
    item_link: {
        name: string;
        link: string;
    }[];
    handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}



export default function Navbar({ children }: NavbarProps) {
    return (
        <div className="fixed top-0 z-10 w-full h-12 px-4 border-b border-gray-200 flex justify-center items-center bg-white">
            <nav className="w-full max-w-screen-xl flex justify-between items-center">
                {children}
            </nav>
        </div>
    )
}


const Items = ({ direction, children }: ItemsProps) => {
    return (
        <div className={`flex gap-2 ${direction === "column" && "flex-col"} ${direction === "row" && "flex-row items-center"}`}>
            {children}
        </div>
    )
}


const Hamburger = ({ is_active, ...props }: HamburgerProps) => {
    return (
        <button className="hover:cursor-pointer" {...props}>
            {is_active ? <IoMdClose className="w-8 h-8" /> : <IoMenuSharp className="w-8 h-8" />}
        </button>
    )
}


const SayHello = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-md uppercase font-medium">{children}</h1>
    )
}


const ActionButton = ({ children, ...props }: ActionButtonProps) => {
    return (
        <button className="w-8 h-8 rounded-sm flex justify-center items-center hover:cursor-pointer bg-black text-white" {...props}>
            {children}
        </button>
    )
}

const AvatarButton = ({ is_active, ...props }: AvatarButtonProps) => {
    return (
        <button className="w-8 h-8 relative rounded-sm hover:cursor-pointer flex items-center gap-0.5 bg-gray-600" {...props}>
            {is_active ? <IoMdArrowDropup className="w-4 h-4 absolute -right-4" /> : <IoMdArrowDropdown className="w-4 h-4 absolute -right-4" />}
        </button>
    )
}

const AvatarNavigation = ({ is_active, name, profile_link, item_link, handleLogout }: AvatarNavigationProps) => {

    const ClassLink = "w-full h-9 rounded-sm flex items-center px-2 text-sm capitalize font-medium hover:cursor-pointer hover:bg-gray-100 duration-150"

    return (
        <>
            {is_active && (
                <div className="fixed top-16 z-10 w-full px-4 flex justify-center items-center">
                    <div className="w-full max-w-screen-xl flex justify-end">
                        <div className="w-full md:max-w-xs p-2 flex flex-col gap-1 rounded-sm border border-gray-200 bg-white">
                            <div className="w-full flex flex-col gap-1.5 border rounded-sm border-gray-200">
                                <div className="w-full p-2 flex items-start gap-2">
                                    <div className="min-w-12 min-h-12 max-w-12 max-h-12 rounded-sm bg-gray-600" />
                                    <div className="w-full">
                                        <h1 className="text-sm font-medium uppercase">{name}</h1>
                                        <Link href={profile_link} className="text-sm font-bold text-blue-500">view profile</Link>
                                    </div>
                                </div>
                            </div>
                            {item_link.map((item, index) => <Link key={index} href={item.link} className={ClassLink}>{item.name}</Link>)}
                            <hr className="w-full border-gray-200" />
                            <button className={ClassLink} onClick={handleLogout}>logout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


Navbar.Items = Items
Navbar.Hamburger = Hamburger
Navbar.SayHello = SayHello
Navbar.ActionButton = ActionButton
Navbar.AvatarButton = AvatarButton
Navbar.AvatarNavigation = AvatarNavigation