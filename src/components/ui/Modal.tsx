import { IoMdClose } from "react-icons/io";

interface ModalProps {
    is_active: boolean;
    handle_close: React.MouseEventHandler<HTMLButtonElement>;
    modal_title: string;
    children: React.ReactNode;
    width?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Modal({ is_active, modal_title, handle_close, width, children }: ModalProps) {
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
        <>
            {is_active && (
                <div className="w-full fixed min-h-screen z-20 p-4 flex justify-center items-center bg-black/25">
                    <div className={`w-full ${maxWidthClass} bg-white`}>
                        <div className="w-full h-12 px-4 border-b border-gray-200 flex justify-between items-center">
                            <h1 className="text-lg font-medium capitalize">{modal_title}</h1>
                            <button onClick={handle_close} className="hover:cursor-pointer text-rose-500">
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}