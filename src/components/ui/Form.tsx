"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";


import { IoEye, IoEyeOff, IoInformation } from "react-icons/io5";


interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    width?: "xs" | "sm" | "md" | "lg" | "xl";
}


interface Label extends React.HTMLAttributes<HTMLLabelElement> {
    id: string;
    name: string;
    required?: boolean;
    isError?: boolean;
}


interface Input extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    id: string;
    isLoading: boolean;
    isError: boolean;
    disabled?: boolean;
}


interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string;
    name: string;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function Form({ width, children, ...props }: FormProps) {
    let maxWidthClass = "";
    switch (width) {
        case "xs": maxWidthClass = "max-w-xs"; break;
        case "sm": maxWidthClass = "max-w-sm"; break;
        case "md": maxWidthClass = "max-w-md"; break;
        case "lg": maxWidthClass = "max-w-lg"; break;
        case "xl": maxWidthClass = "max-w-xl"; break;
        default: maxWidthClass = "";
    }

    return (
        <form className={`w-full h-fit flex flex-col gap-4 ${maxWidthClass}`} {...props}>
            {children}
        </form>
    )
}


const Response = ({ isError, message }: { isError: boolean, message: string }) => {
    return (
        <div className={`w-full h-10 px-2.5 flex items-center gap-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"} text-white`}>
            <IoInformation className="w-5 h-5" />
            <span>{message}</span>
        </div>
    )
}


const Group = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
            {children}
        </div>
    );
};


const Item = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex flex-col gap-1.5">
            {children}
        </div>
    )
}


const Label = ({ id, name, required, isError }: Label) => {
    return (
        <label htmlFor={id} className="w-full flex items-center gap-1">
            <span className={`text-xs capitalize ${isError && "text-red-500"}`}>{name}</span>
            {required && <span className="text-red-500">*</span>}
        </label>
    )
}


const InputClass = "w-full h-10 px-2.5 border rounded-sm border-gray-300 focus:border-gray-400 focus:outline-none duration-150"
const InputDisabledClass = "bg-gray-100 hover:cursor-not-allowed"

const Text = ({ id, isLoading, isError, disabled, ...props }: Input) => {
    return (
        <input
            type="text"
            id={id}
            name={id}
            disabled={disabled}
            className={`${InputClass} ${isLoading && "hover:cursor-not-allowed"} ${disabled && InputDisabledClass} ${isError && "border-red-500"}`}{...props}
        />
    )
}


const Email = ({ id, isLoading, isError, disabled, ...props }: Input) => {
    return (
        <input
            type="email"
            id={id}
            name={id}
            disabled={disabled}
            className={`${InputClass} ${isLoading && "hover:cursor-not-allowed"} ${disabled && InputDisabledClass} ${isError && "border-red-500"}`}{...props}
        />
    )
}


const Password = ({ id, isLoading, isError, disabled, ...props }: Input) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="w-full relative">
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                name={id}
                disabled={disabled}
                className={`${InputClass} ${isLoading && "hover:cursor-not-allowed"} ${disabled && InputDisabledClass} ${isError && "border-red-500"}`}{...props}
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
            </button>
        </div>
    )
}


const Textarea = ({ id, isLoading, isError, disabled, ...props }: Input) => {
    const TextareaClass = "w-full h-30 p-2.5 border rounded-sm border-gray-300 focus:border-gray-400 focus:outline-none duration-150"
    return (
        <textarea
            name={id}
            id={id}
            disabled={disabled}
            className={`${TextareaClass} ${isLoading && "hover:cursor-not-allowed"} ${disabled && InputDisabledClass} ${isError && "border-red-500"}`}{...props}
        ></textarea>
    )
}


const ButtonClass = "w-full h-10 px-2.5 flex items-center justify-center gap-2 rounded-sm duration-150"

const Submit = ({ id, name, disabled, isLoading }: Button) => {
    return (
        <button id={id} type="submit" className={`${ButtonClass} ${isLoading ? "hover:cursor-wait" : "hover:cursor-pointer"} ${disabled && "hover:cursor-not-allowed"} bg-black hover:bg-gray-800 text-white`}>
            <span>{name} {isLoading && "..."}</span>
        </button>
    )
}


const Navigation = ({ to, name }: { to: string, name: string }) => {
    return (
        <div className="w-full flex justify-center">
            <Link href={to} className="text-sm font-medium hover:underline hover:underline-offset-4 text-blue-500">
                {name}
            </Link>
        </div>
    )
}


Form.Response = Response
Form.Group = Group
Form.Item = Item
Form.Label = Label
Form.Text = Text
Form.Email = Email
Form.Password = Password
Form.Textarea = Textarea
Form.Submit = Submit
Form.Navigation = Navigation