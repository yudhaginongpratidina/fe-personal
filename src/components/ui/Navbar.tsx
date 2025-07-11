import Link from "next/link"

import { IoMdArrowDropdown, IoMdArrowDropup, IoMdClose } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"

interface NavbarProps {
    children: React.ReactNode
}


interface ItemsProps {
    children: React.ReactNode
    direction: "column" | "row"
    className?: string
}


interface HamburgerProps extends React.HTMLAttributes<HTMLButtonElement> {
    is_active: boolean
}


interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
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


const Items = ({ direction, children, className }: ItemsProps) => {
    return (
        <div className={`flex gap-2 ${direction === "column" && "flex-col"} ${direction === "row" && "flex-row items-center"} ${className}`}>
            {children}
        </div>
    )
}


const ItemLink = ({name, href}: {name: string, href: string}) => {
    return (
        <Link href={href}>
            <h1 className="text-lg hover:text-white md:hover:text-black md:text-sm font-medium md:hover:underline md:hover:underline-offset-8">{name}</h1>
        </Link>
    )
}


const Hamburger = ({ is_active, ...props }: HamburgerProps) => {
    return (
        <button className="hover:cursor-pointer" {...props}>
            {is_active ? <IoMdClose className="w-6 h-6" /> : <IoMenuSharp className="w-6 h-6" />}
        </button>
    )
}

const SayHello = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-md uppercase font-medium">{children}</h1>
    )
}


const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
    return (
        <button className={`w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer bg-black text-white ${className}`} {...props}>
            {children}
        </button>
    )
}

const AvatarButton = ({ is_active, ...props }: AvatarButtonProps) => {
    return (
        <button className="w-8 h-8 relative rounded-full hover:cursor-pointer flex items-center gap-0.5 bg-gray-600" {...props}>
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
                        <div className="w-full md:max-w-[200px] p-2 flex flex-col gap-1 rounded-sm border border-gray-200 bg-white">
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
Navbar.ItemLink = ItemLink
Navbar.Hamburger = Hamburger
Navbar.SayHello = SayHello
Navbar.ActionButton = ActionButton
Navbar.AvatarButton = AvatarButton
Navbar.AvatarNavigation = AvatarNavigation