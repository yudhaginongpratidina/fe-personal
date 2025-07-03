"use client";
import api from "@/utils/api";
import useInfo from "@/hooks/useInfo";
import useForm from "@/hooks/useForm";

import Form from "@/components/ui/Form"
import MediaSocialIconLink from "@/components/ui/MediaSocialIconLink";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Page() {
    const { info, handleInfo, handleClearInfo } = useInfo();
    const { values: contact, handleChange, resetForm } = useForm<{
        full_name: string,
        email: string,
        phone: string,
        message: string
    }>({
        full_name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleInfo({ isLoading: true, isError: false, message: "" });
        try {
            const { data } = await api.post("/messages", contact);
            handleInfo({ isLoading: false, isError: false, message: data.message });
            resetForm();
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.response?.data?.data[0].message || "Send message failed. Please try again later.";
            handleInfo({ isLoading: false, isError: true, message });
        } finally {
            handleClearInfo();
        }
    }

    return (
        <>
            <div className="w-full h-[500px]">

            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full max-w-lg flex flex-col gap-4">
                    <h1 className="text-2xl font-medium">Let's Connect</h1>
                    <p className="text-justify text-gray-500">
                        Whether it's about a new project, partnership opportunity, or just a casual tech discussion,
                        I'd love to hear from you. Reach out and let's start the conversation.
                    </p>
                    <div className="w-full flex items-center gap-4">
                        <MediaSocialIconLink href="https://github.com/yudhaginongpratidina" icon={<FaGithub className="w-4 h-4" />} />
                        <MediaSocialIconLink href="https://www.linkedin.com/in/yudha-ginong-pratidina/" icon={<FaLinkedin className="w-4 h-4" />} />
                    </div>
                </div>
                <div className="w-full">
                    <Form onSubmit={handleSendMessage}>
                        <Form.Item>
                            <Form.Label id="full_name" name="full name" required />
                            <Form.Text required id="full_name" value={contact.full_name} isError={info.isError} isLoading={info.isLoading} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="email" name="e-mail" required />
                            <Form.Email required id="email" value={contact.email} isError={info.isError} isLoading={info.isLoading} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="phone" name="phone (optional)" />
                            <Form.Email id="phone" value={contact.phone} isError={info.isError} isLoading={info.isLoading} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Form.Label id="message" name="message" />
                            <Form.Textarea id="message" value={contact.message} isError={info.isError} isLoading={info.isLoading} onChange={handleChange} />
                        </Form.Item>
                        {info.message && <Form.Response isError={info.isError} message={info.message} />}
                        <Form.Submit id="btn-login" name="Send Message" isLoading={false} disabled={false} />
                    </Form>
                </div>
            </div>
        </>
    )
}