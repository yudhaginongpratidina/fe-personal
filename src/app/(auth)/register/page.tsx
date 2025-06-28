"use client";
import api from "@/utils/api";
import useInfo from "@/hooks/useInfo";
import useForm from "@/hooks/useForm";

import Form from "@/components/ui/Form";

export default function Page() {
    const { info, handleInfo, handleClearInfo } = useInfo();
    const { values: credentials, handleChange, resetForm } = useForm<{ name: string, email: string; password: string; confirm_password: string }>({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleInfo({ isLoading: true, isError: false, message: "" });
        try {
            const { data } = await api.post("/auth/register", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                confirm_password: credentials.confirm_password,
            });
            handleInfo({ isLoading: false, isError: false, message: data.message });
            resetForm();
            setTimeout(() => window.location.assign("/login"), 2000);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Registration failed. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
        }
    }

    return (
        <>
            <Form onSubmit={handleRegister} width="sm">
                {info.message && <Form.Response isError={info.isError} message={info.message} />}
                <Form.Item>
                    <Form.Label id="name" name="name" required />
                    <Form.Text id="name" isLoading={info.isLoading} isError={info.isError} value={credentials.name} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Form.Label id="email" name="e-mail" required />
                    <Form.Email id="email" isLoading={info.isLoading} isError={info.isError} value={credentials.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Form.Label id="password" name="password" required />
                    <Form.Password id="password" isLoading={info.isLoading} isError={info.isError} value={credentials.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Form.Label id="confirm_password" name="confirm password" required />
                    <Form.Password id="confirm_password" isLoading={info.isLoading} isError={info.isError} value={credentials.confirm_password} onChange={handleChange} />
                </Form.Item>
                <Form.Submit id="btn-register" name="Register" isLoading={info.isLoading} disabled={info.isLoading} />
                <Form.Navigation to="/login" name="I already have an account" />
            </Form>
        </>
    )
}