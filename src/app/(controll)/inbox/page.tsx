"use client";
import { useState } from "react";
import Link from "next/link";
import Tab from "@/components/ui/Tab"

import { IoMailUnread, IoReader, IoEyeSharp  } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import InboxPandingDataTable from "@/components/tables/InboxPandingDataTable";

export default function Page() {
    const [tab_name, setTabName] = useState("pending");
    const handleTabChange = (name: string) => { setTabName(name); }
    return (
        <>
            <Tab>
                <Tab.Navigation title="inbox">
                    <Tab.NavigationItem
                        count={5}
                        id="pending"
                        name="pending"
                        tab_active={tab_name}
                        icon={<IoMailUnread className="w-5 h-5" />}
                        onClick={() => handleTabChange("pending")}
                    />
                    <Tab.NavigationItem
                        count={5}
                        id="read"
                        name="read"
                        tab_active={tab_name}
                        icon={<IoReader className="w-5 h-5" />}
                        onClick={() => handleTabChange("read")}
                    />
                    <Tab.NavigationItem
                        count={15}
                        id="resolved"
                        name="resolved"
                        tab_active={tab_name}
                        icon={<MdOutlineMarkEmailRead className="w-5 h-5" />}
                        onClick={() => handleTabChange("resolved")}
                    />
                </Tab.Navigation>


                <Tab.Content id="pending" tab_active={tab_name}>
                    <div className="w-full flex items-center gap-2">
                        <div className="w-7 h-7 flex items-center justify-center border rounded-full bg-black text-white">
                            <IoMailUnread className="w-3 h-3" />
                        </div>
                        <h1 className="text-md uppercase font-medium">status {tab_name}</h1>
                    </div>
                    <InboxPandingDataTable/>
                </Tab.Content>

                <Tab.Content id="read" tab_active={tab_name}>
                    <div className="w-full flex items-center gap-2">
                        <div className="w-7 h-7 flex items-center justify-center border rounded-full bg-black text-white">
                            <IoMailUnread className="w-3 h-3" />
                        </div>
                        <h1 className="text-md uppercase font-medium">status {tab_name}</h1>
                    </div>
                </Tab.Content>

                <Tab.Content id="resolved" tab_active={tab_name}>
                    <div className="w-full flex items-center gap-2">
                        <div className="w-7 h-7 flex items-center justify-center border rounded-full bg-black text-white">
                            <IoMailUnread className="w-3 h-3" />
                        </div>
                        <h1 className="text-md uppercase font-medium">status {tab_name}</h1>
                    </div>
                </Tab.Content>
            </Tab>
        </>
    )
}