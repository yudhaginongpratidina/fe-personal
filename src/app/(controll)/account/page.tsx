"use client";
import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import api from "@/utils/api";
import useInfo from "@/hooks/useInfo";
import useForm from "@/hooks/useForm";

import Form from "@/components/ui/Form"
import Tab from "@/components/ui/Tab";

import { FaUser, FaLock } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";

export default function Page() {
    const { info, handleInfo, handleClearInfo } = useInfo();
    const { values: users, handleChange, resetForm } = useForm<{
        name: string;
        email: string;
        old_password: string;
        new_password: string;
        confirm_password: string;
        confirm_delete: string;
    }>({
        name: "",
        email: "",
        old_password: "",
        new_password: "",
        confirm_password: "",
        confirm_delete: ""
    });

    const fetch_data_account = async () => {
        try {
            const { data } = await api.get("/account");
            handleInfo({ isLoading: false, isError: false, message: data.message });
            users.name = data.data.name;
            users.email = data.data.email;
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Error. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
        }
    }

    const handle_update_info = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await api.patch("/account/info", { name: users.name });
            handleInfo({ isLoading: false, isError: false, message: data.message });
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Error. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
        }
    }

    const handle_update_password = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await api.patch("/account/password", {
                old_password: users.old_password,
                new_password: users.new_password,
                confirm_password: users.confirm_password
            });
            handleInfo({ isLoading: false, isError: false, message: data.message });
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Error. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
            resetForm();
        }
    }

    const handle_delete_account = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {data} = await api.delete("/account", {
                data: {
                    password: users.confirm_password,
                    confirm_delete: users.confirm_delete
                }
            });
            handleInfo({ isLoading: false, isError: false, message: data.message });
            secureLocalStorage.removeItem("token");
            setTimeout(() => window.location.assign("/login"), 2000);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Error. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
            resetForm();
        }
    }

    const [tab_name, setTabName] = useState("info");
    const handleTabChange = (name: string) => { setTabName(name); }

    useEffect(() => {
        fetch_data_account();
    }, []);

    return (
        <>
            <Tab>
                <Tab.Navigation title="menu">
                    <Tab.NavigationItem id="info" tab_active={tab_name} name="info" icon={<FaUser className="w-5 h-5" />} onClick={() => handleTabChange("info")} />
                    <Tab.NavigationItem id="change_password" tab_active={tab_name} name="change password" icon={<TbPasswordUser className="w-5 h-5" />} onClick={() => handleTabChange("change_password")} />
                    <Tab.NavigationItem id="delete_account" tab_active={tab_name} name="delete account" icon={<FaLock className="w-5 h-5" />} onClick={() => handleTabChange("delete_account")} />
                </Tab.Navigation>


                <Tab.Content id="info" tab_active={tab_name}>
                    <Form onSubmit={handle_update_info}>
                        {info.message && <Form.Response isError={info.isError} message={info.message} />}
                        <Form.Item>
                            <Form.Label id="name" name="name" required />
                            <Form.Text id="name" isLoading={info.isLoading} isError={info.isError} value={users.name} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="email" name="e-mail" required />
                            <Form.Email id="email" isLoading={info.isLoading} isError={info.isError} disabled={true} value={users.email} onChange={handleChange} />
                        </Form.Item>
                        <Form.Submit id="submit" name="Update" disabled={info.isLoading} isLoading={info.isLoading} />
                    </Form>
                </Tab.Content>


                <Tab.Content id="change_password" tab_active={tab_name}>
                    {info.message && <Form.Response isError={info.isError} message={info.message} />}
                    <Form onSubmit={handle_update_password}>
                        <Form.Item>
                            <Form.Label id="old_password" name="old password" required />
                            <Form.Password id="old_password" isLoading={info.isLoading} isError={info.isError} value={users.old_password} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="new_password" name="new password" required />
                            <Form.Password id="new_password" isLoading={info.isLoading} isError={info.isError} value={users.new_password} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="confirm_password" name="confirm password" required />
                            <Form.Password id="confirm_password" isLoading={info.isLoading} isError={info.isError} value={users.confirm_password} onChange={handleChange} />
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
                    <Form onSubmit={handle_delete_account}>
                        {info.message && <Form.Response isError={info.isError} message={info.message} />}
                        <Form.Password id="confirm_password" isLoading={info.isLoading} isError={info.isError} placeholder="CONFIRM PASSWORD" value={users.confirm_password} onChange={handleChange} />
                        <Form.Text id="confirm_delete" isLoading={info.isLoading} isError={info.isError} placeholder="DELETE ACCOUNT" value={users.confirm_delete} onChange={handleChange} />
                        <Form.Submit id="submit" name="Delete" disabled={info.isLoading} isLoading={info.isLoading} />
                    </Form>
                </Tab.Content>
            </Tab>
        </>
    )
}