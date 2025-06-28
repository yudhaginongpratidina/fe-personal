import { FaInfoCircle } from "react-icons/fa";

export default function ResponseMessage({ isError, message }: { isError: boolean, message: string }) {
    return (
        <div className={`w-full h-12 px-2.5 flex items-center gap-2 rounded-sm ${isError ? "bg-red-500" : "bg-green-500"} text-white`}>
            <FaInfoCircle className="w-5 h-5" />
            <span>{message}</span>
        </div>
    )
}