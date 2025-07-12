"use client";
import { useState } from "react";
import { ColumnDef } from '@tanstack/react-table'

import Tab from "@/components/ui/Tab"
import DataTable from "@/components/ui/DataTable";

import { IoMailUnread, IoReader, IoTrash, IoArrowBack, IoLogoWhatsapp, IoPrint } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import { FaMessage } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";


type Data = {
    id: string
    full_name: string
    email: string
    status: "PENDING" | "READ" | "RESOLVED"
}

const Example: Data[] = [
    { id: "1", full_name: "John Doe", email: "5Hg9S@example.com", status: "PENDING" },
    { id: "2", full_name: "Jane Smith", email: "jane.smith@example.com", status: "READ" },
    { id: "3", full_name: "Alice Johnson", email: "alice.j@example.com", status: "RESOLVED" },
    { id: "4", full_name: "Bob Williams", email: "bob.williams@example.com", status: "PENDING" },
    { id: "5", full_name: "Charlie Brown", email: "charlie.brown@example.com", status: "READ" },
    { id: "6", full_name: "Diana Prince", email: "diana.prince@example.com", status: "RESOLVED" },
    { id: "7", full_name: "Ethan Hunt", email: "ethan.hunt@example.com", status: "PENDING" },
    { id: "8", full_name: "Fiona Gallagher", email: "fiona.g@example.com", status: "READ" },
    { id: "9", full_name: "George Martin", email: "george.martin@example.com", status: "RESOLVED" },
    { id: "10", full_name: "Hannah Lee", email: "hannah.lee@example.com", status: "PENDING" },
]


export default function Page() {
    const [id, setId] = useState("pending");
    const [tab_name, setTabName] = useState("pending");
    const [modal_detail_is_active, setModalDetailIsActive] = useState(false);
    const [modal_detail_id, setModalDetailId] = useState("");

    const handleTabChange = (name: string) => {
        setId(name);
        setTabName(name);
    }

    const handleModalDetail = (id: string) => {
        setModalDetailIsActive(true);
        setModalDetailId(id);
    }

    const Columns: ColumnDef<Data>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    ref={el => { if (el) { el.indeterminate = !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected(); } }}
                    onChange={e => table.toggleAllPageRowsSelected(e.target.checked)}
                    className='text-center'
                />
            ),
            cell: ({ row }) => (
                <div className='text-center'>
                    <input type="checkbox" checked={row.getIsSelected()} ref={el => { if (el) { el.indeterminate = !row.getIsSelected() && row.getIsSomeSelected(); } }} onChange={e => row.toggleSelected(e.target.checked)} className='text-center' />
                </div>
            )
        },
        {
            accessorKey: "full_name",
            header: () => <div className='w-full text-start'>Full Name</div>,
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("full_name")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: () => <div className='w-full text-start hidden md:block'>E-Mail</div>,
            cell: ({ row }) => (
                <div className="capitalize hidden md:block">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "id",
            header: () => <div className='w-full text-center'>Action</div>,
            cell: ({ row }) => (
                <div className="text-center">
                    <button onClick={() => handleModalDetail(row.getValue("id"))} className="hover:cursor-pointer">
                        <FaEye className="w-5 h-5" />
                    </button>
                </div>
            ),
        }
    ]

    return (
        <>
            {modal_detail_is_active == false && (
                <Tab>
                    <Tab.Navigation title="inbox">
                        <Tab.NavigationItem count={5} id="pending" name="pending" tab_active={tab_name} icon={<IoMailUnread className="w-5 h-5" />} onClick={() => handleTabChange("pending")} />
                        <Tab.NavigationItem count={5} id="read" name="read" tab_active={tab_name} icon={<IoReader className="w-5 h-5" />} onClick={() => handleTabChange("read")} />
                        <Tab.NavigationItem count={15} id="resolved" name="resolved" tab_active={tab_name} icon={<MdOutlineMarkEmailRead className="w-5 h-5" />} onClick={() => handleTabChange("resolved")} />
                    </Tab.Navigation>
                    <Tab.Content id={id} tab_active={tab_name}>
                        <div className="w-full flex items-center gap-2">
                            <div className="w-7 h-7 flex items-center justify-center border rounded-full bg-black text-white">
                                <IoMailUnread className="w-3 h-3" />
                            </div>
                            <h1 className="text-md uppercase font-medium">status {tab_name}</h1>
                        </div>
                        <DataTable<Data> sources={Example} columns={Columns} search_by="full_name" />
                    </Tab.Content>
                </Tab>
            )}

            {modal_detail_id && modal_detail_is_active && (
                <div className="w-full p-2.5 flex flex-col gap-2.5 rounded-sm shadow-sm drop-shadow-sm border border-gray-200">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setModalDetailIsActive(false)} className="w-8 h-8 flex justify-center items-center border rounded-sm border-gray-200 hover:bg-black hover:text-white hover:cursor-pointer">
                                <IoArrowBack className="w-4 h-4" />
                            </button>
                            <button onClick={() => setModalDetailIsActive(false)} className="w-8 h-8 flex justify-center items-center border rounded-sm border-gray-200 hover:bg-black hover:text-white hover:cursor-pointer">
                                <IoTrash className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={() => setModalDetailIsActive(false)} disabled={tab_name == "resolved"} className={`h-8 px-2 flex justify-center items-center border rounded-sm border-gray-900 bg-black text-white hover:bg-gray-800  ${tab_name == "resolved" ? "opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                            {tab_name == "pending" && <h1 className="text-sm capitalize">mark as read</h1>}
                            {tab_name == "read" && <h1 className="text-sm capitalize">mark as unread</h1>}
                            {tab_name == "resolved" && <h1 className="text-sm capitalize">mark as resolved</h1>}
                        </button>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="w-fit flex items-center gap-2">
                            <div className="w-10 h-10 rounded-sm bg-gray-400" />
                            <div className="flex flex-col">
                                <h1 className="text-sm font-bold">John Doe</h1>
                                <h2 className="text-sm">jhon@gmail.com</h2>
                            </div>
                        </div>
                        <div className="w-fit flex justify-end items-center gap-2">
                            <button onClick={() => setModalDetailIsActive(false)} className="w-8 h-8 flex justify-center items-center border rounded-sm border-gray-200 hover:bg-black hover:text-white hover:cursor-pointer">
                                <IoPrint className="w-4 h-4" />
                            </button>
                            <button onClick={() => setModalDetailIsActive(false)} className="w-8 h-8 flex justify-center items-center border rounded-sm border-gray-200 hover:bg-black hover:text-white hover:cursor-pointer">
                                <IoLogoWhatsapp className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full p-2.5 h-[200px] border rounded-sm border-gray-200">
                        <div className="w-full flex items-center gap-2">
                            <FaMessage className="w-5 h-5" />
                            <h1 className="text-md font-medium">Message</h1>
                        </div>
                    </div>
                    <div className="w-full p-2.5 h-[100px] border rounded-sm border-gray-200">
                        <div className="w-full flex items-center gap-2">
                            <TiAttachment className="w-5 h-5" />
                            <h1 className="text-md font-medium">Attachments</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}