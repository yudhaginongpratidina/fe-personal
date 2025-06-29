"use client";
import { useState } from "react";

import Form from "@/components/ui/Form"
import Tab from "@/components/ui/Tab";

import { FaUser, FaLock } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";

export default function Page() {
    const [tab_name, setTabName] = useState("info");

    const handleTabChange = (name: string) => { setTabName(name); }

    return (
        <>
            <Tab>
                <Tab.Navigation title="menu">
                    <Tab.NavigationItem id="info" tab_active={tab_name} name="info" icon={<FaUser className="w-5 h-5" />} onClick={() => handleTabChange("info")} />
                    <Tab.NavigationItem id="change_password" tab_active={tab_name} name="change password" icon={<TbPasswordUser className="w-5 h-5" />} onClick={() => handleTabChange("change_password")} />
                    <Tab.NavigationItem id="delete_account" tab_active={tab_name} name="delete account" icon={<FaLock className="w-5 h-5" />} onClick={() => handleTabChange("delete_account")} />
                </Tab.Navigation>


                <Tab.Content id="info" tab_active={tab_name}>
                    <Form>
                        <Form.Item>
                            <Form.Label id="name" name="name" required />
                            <Form.Text id="name" isLoading={false} isError={false} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="email" name="e-mail" required />
                            <Form.Email id="email" isLoading={false} isError={false} disabled={true} />
                        </Form.Item>
                        <Form.Submit id="submit" name="Update" disabled={false} isLoading={false} />
                    </Form>
                </Tab.Content>


                <Tab.Content id="change_password" tab_active={tab_name}>
                    <Form>
                        <Form.Item>
                            <Form.Label id="old_password" name="old password" required />
                            <Form.Password id="old_password" isLoading={false} isError={false} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="new_password" name="new password" required />
                            <Form.Password id="new_password" isLoading={false} isError={false} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="confirm_password" name="confirm password" required />
                            <Form.Password id="confirm_password" isLoading={false} isError={false} />
                        </Form.Item>
                        <Form.Submit id="submit" name="Update" disabled={false} isLoading={false} />
                    </Form>
                </Tab.Content>


                <Tab.Content id="delete_account" tab_active={tab_name}>
                    <p className="text-sm text-gray-700">
                        Deleting your account is a permanent action. This will remove all your personal information,
                        saved preferences, uploaded content, and any other data associated with your account. Once deleted,
                        your data cannot be recovered, and you will lose access to all services linked to this account.
                        Please type <b>DELETE ACCOUNT</b> in the field below to confirm that you want to delete your account.
                    </p>
                    <Form>
                        <Form.Item>
                            <Form.Text id="name" isLoading={false} isError={false} placeholder="DELETE ACCOUNT" />
                        </Form.Item>
                        <Form.Submit id="submit" name="Delete" disabled={false} isLoading={false} />
                    </Form>
                </Tab.Content>
            </Tab>
        </>
    )
}