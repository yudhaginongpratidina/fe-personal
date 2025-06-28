interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string;
    children: React.ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
}

export default function Button({ id, children, disabled, isLoading, className, ...props }: Button) {
    return (
        <button id={id} disabled={disabled} className={`w-full h-12 px-2.5 flex items-center justify-center gap-2 rounded-sm duration-150 ${isLoading ? "hover:cursor-wait" : "hover:cursor-pointer"} ${disabled && "hover:cursor-not-allowed"} ${className}`} {...props}>
            {children}
        </button>
    )
}