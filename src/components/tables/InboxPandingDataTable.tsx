import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";

export default function InboxPandingDataTable() {
    return (
        <>
            <table className="w-full">
                <thead className="w-full">
                    <tr className="w-full">
                        <td className="w-[40px] p-2.5 capitalize border-b border-gray-400">
                            <div className="flex justify-center items-center">
                                <input type="checkbox" name="all" id="all" className="w-4 h-4" />
                            </div>
                        </td>
                        <td className="w-[60px] p-2.5 capitalize text-sm font-medium border-b border-gray-400">no</td>
                        <td className="w-full p-2.5 capitalize text-sm font-medium border-b border-gray-400">full name</td>
                        <td className="w-[100px] p-2.5 capitalize text-sm font-medium border-b border-gray-400"></td>
                    </tr>
                </thead>
                <tbody className="w-full">
                    <tr className="w-full hover:bg-gray-100">
                        <td className="w-[40px] p-2.5 capitalize border-b border-gray-400">
                            <div className="flex justify-center items-center">
                                <input type="checkbox" name="all" id="all" className="w-4 h-4" />
                            </div>
                        </td>
                        <td className="w-[60px] p-2.5 capitalize text-sm border-b border-gray-400">1</td>
                        <td className="w-full p-2.5 border-b border-gray-400">
                            <Link href={""} className="w-full capitalize text-sm">user 1</Link>
                        </td>
                        <td className="w-full p-2.5 border-b border-gray-400">
                            <Link href={""} className="hover:cursor-pointer">
                                <IoEyeSharp className="w-5 h-5" />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}