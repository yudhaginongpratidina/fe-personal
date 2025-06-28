"use client";
import api from "@/utils/api";
import useInfo from "@/hooks/useInfo";
import useForm from "@/hooks/useForm";

import Form from "@/components/ui/Form";

export default function Page() {
    const { info, handleInfo, handleClearInfo } = useInfo();
    const { values: credentials, handleChange, resetForm } = useForm<{ email: string; password: string; }>({ email: "", password: "" });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleInfo({ isLoading: true, isError: false, message: "" });
        try {
            const { data } = await api.post("/auth/login", { email: credentials.email, password: credentials.password, });
            handleInfo({ isLoading: false, isError: false, message: data.message });
            resetForm();
            setTimeout(() => window.location.assign("/dashboard"), 2000);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Login failed. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
        }
    };

    return (
        <>
            <Form onSubmit={handleLogin} width="sm">
                {info.message && <Form.Response isError={info.isError} message={info.message} />}
                <Form.Item>
                    <Form.Label id="email" name="e-mail" required />
                    <Form.Email id="email" isLoading={info.isLoading} isError={info.isError} value={credentials.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Form.Label id="password" name="password" required />
                    <Form.Password id="password" isLoading={info.isLoading} isError={info.isError} value={credentials.password} onChange={handleChange} />
                </Form.Item>
                <Form.Submit id="btn-login" name="Login" isLoading={info.isLoading} disabled={info.isLoading} />
                <Form.Navigation to="/register" name="Don't have an account?" />
            </Form>
        </>
    )
}