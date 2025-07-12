"use client";
import { useState } from "react";

import api from "@/utils/api";
import useInfo from "@/hooks/useInfo";
import useForm from "@/hooks/useForm";

import Form from "@/components/ui/Form"
import MediaSocialIconLink from "@/components/ui/MediaSocialIconLink";

import { FaGithub, FaLinkedin, FaUser, FaBriefcase, FaFileAlt, FaNewspaper, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function Page() {
    return (
        <div className="w-full flex flex-col gap-12">
            <JumbotronSection />
            <AboutSection />
            <ProjectSection />
            <ContactSection />
        </div>
    )
}

const JumbotronSection = () => {
    return (
        <div className="w-full h-[500px]">

        </div>
    )
}


const AboutSection = () => {
    const [tab_active, setTabActive] = useState("about");

    const handleTabChange = (name: string) => {
        setTabActive(name);
    }

    const TAB_STYLE = "w-full h-12 px-4 flex items-center justify-between gap-2 border rounded-sm capitalize hover:cursor-pointer duration-200";
    const TAB_ACTIVE_STYLE = "bg-black text-white";
    const TAB_INACTIVE_STYLE = "border-black text-black hover:bg-black hover:text-white";

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full md:max-w-xs h-fit flex flex-col gap-2">
                <button onClick={() => handleTabChange("about")} className={`${TAB_STYLE} ${tab_active == "about" ? TAB_ACTIVE_STYLE : TAB_INACTIVE_STYLE}`}>
                    <span>about</span>
                    <IoMdArrowDropright className="w-5 h-5" />
                </button>
                <button onClick={() => handleTabChange("experience")} className={`${TAB_STYLE} ${tab_active == "experience" ? TAB_ACTIVE_STYLE : TAB_INACTIVE_STYLE}`}>
                    <span>experience</span>
                    <IoMdArrowDropright className="w-5 h-5" />
                </button>
                <button onClick={() => handleTabChange("skills")} className={`${TAB_STYLE} ${tab_active == "skills" ? TAB_ACTIVE_STYLE : TAB_INACTIVE_STYLE}`}>
                    <span>skills</span>
                    <IoMdArrowDropright className="w-5 h-5" />
                </button>
                <button onClick={() => handleTabChange("certificates")} className={`${TAB_STYLE} ${tab_active == "certificates" ? TAB_ACTIVE_STYLE : TAB_INACTIVE_STYLE}`}>
                    <span>certificates</span>
                    <IoMdArrowDropright className="w-5 h-5" />
                </button>
            </div>
            <div className="w-full h-[300px] p-2.5 flex flex-col gap-2 border rounded-sm border-gray-200 bg-white">
                <h1 className="w-full flex items-center gap-2.5 uppercase text-md font-semibold">
                    {tab_active == "about" && <FaUser />}
                    {tab_active == "experience" && <FaBriefcase />}
                    {tab_active == "skills" && <FaFileAlt />}
                    {tab_active == "certificates" && <FaNewspaper />}
                    {tab_active}
                </h1>
                <hr className="w-full border-gray-200" />
            </div>
        </div>
    )
}


const ProjectSection = () => {
    const [tab_active, setTabActive] = useState("all");

    const handleTabChange = (name: string) => {
        setTabActive(name);
    };

    return (
        <div className="w-full p-2.5 flex flex-col gap-2 border rounded-sm border-gray-200 bg-white">
            <div className="w-full flex justify-between items-center">
                <h1 className="w-full flex items-center gap-2.5 uppercase text-md font-semibold">
                    <FaFileAlt />
                    Last Project
                </h1>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleTabChange("all")} className={`h-8 px-2.5 border rounded-sm capitalize cursor-pointer ${tab_active == "all" ? "bg-black text-white" : "border-gray-200 hover:bg-black hover:text-white"}`}>all</button>
                    <button onClick={() => handleTabChange("archive")} className={`h-8 px-2.5 border rounded-sm capitalize cursor-pointer ${tab_active == "archive" ? "bg-black text-white" : "border-gray-200 hover:bg-black hover:text-white"}`}>archive</button>
                </div>
            </div>
            <hr className="w-full border-gray-200" />

            {tab_active == "all" && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            )}

            {tab_active == "archive" && (
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full h-16 px-2.5 flex justify-between items-center border rounded-sm border-gray-200 bg-white">
                        <h1 className="text-md font-semibold">E-Commerce</h1>
                        <div className="w-fit flex items-center gap-1.5">
                            <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                                <FaEye className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                                <FaGithub className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                                <FaExternalLinkAlt className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const ProjectCard = () => {
    const [detailActive, setDetailActive] = useState(false);
    const handleDetail = () => setDetailActive(true);
    const handleCloseDetail = () => setDetailActive(false);

    const description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia sit libero deleniti esse ab 
    tempore culpa ad eveniet iure dolores fuga, nisi enim explicabo ea, asperiores 
    voluptate! Et, est soluta.`;

    const maxLength = 150;

    return (
        <div className="relative">
            <div className="w-full border rounded-sm border-gray-200">
                <div className="w-full h-52 bg-gray-400" />
                <div className="w-full h-24 box-border p-2.5">
                    <h1 className="text-md font-semibold">E-Commerce</h1>
                    <p className="text-sm">
                        {description.slice(0, maxLength) + "... "}
                        <button onClick={handleDetail} className="text-blue-600 hover:underline ml-1 hover:underline-offset-2 hover:cursor-pointer"> baca selengkapnya</button>
                    </p>
                </div>
                <div className="w-full p-2.5 flex items-center gap-2 border-t border-gray-200">
                    <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                        <FaGithub className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                        <FaExternalLinkAlt className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <ProjectDetail is_active={detailActive} on_close={handleCloseDetail} />
        </div>
    );
};


const ProjectDetail = ({ is_active, on_close }: { is_active: boolean, on_close: () => void }) => {
    return (
        <>
            {is_active && (
                <div className="fixed inset-0 z-30 bg-black/60 flex items-center justify-center px-4">
                    <div className="w-full max-w-screen-lg h-[600px] p-4 flex flex-col gap-4 rounded-sm shadow-sm overflow-y-scroll bg-white">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="w-full flex items-center gap-2.5 uppercase text-md font-semibold">
                                <FaFileAlt />
                                Detail Project
                            </h1>
                            <button onClick={on_close} className="hover:cursor-pointer text-gray-500 hover:text-gray-700 text-xl">
                                <IoCloseSharp />
                            </button>
                        </div>
                        <hr className="w-full border-gray-200" />
                        <div className="w-full flex flex-col md:flex-row-reverse gap-2.5 md:gap-0.5">
                            <div className="w-full h-72 md:h-80 border rounded-sm border-gray-200">

                            </div>
                            <div className="w-fit flex items-center md:flex-col gap-2.5 md:gap-0.5">
                                <button className="min-w-24 min-h-24 max-w-24 max-h-24 md:min-w-80 md:max-w-80 md:min-h-40 md:max-h-40 border rounded-sm border-gray-200 hover:cursor-pointer"></button>
                                <button className="min-w-24 min-h-24 max-w-24 max-h-24 md:min-w-80 md:max-w-80 md:min-h-40 md:max-h-40 border rounded-sm border-gray-200 hover:cursor-pointer"></button>
                            </div>
                        </div>
                        <hr className="w-full border-gray-200" />
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-md font-semibold">E-Commerce</h1>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, error. Magnam omnis rem pariatur qui ab nostrum
                                voluptatem numquam cupiditate nihil consectetur fuga, eaque, at quae illum quis maxime ducimus esse molestias
                                laudantium autem neque odio! Molestiae quae esse labore error at est laboriosam, ratione corrupti ab excepturi, officiis
                                consequuntur aliquid eos veniam architecto repellat, optio atque eveniet iure modi laborum sequi et? At eligendi consectetur
                                molestias eum sapiente odit saepe. In assumenda sit dolores consequatur hic veniam. Suscipit, officia?
                            </p>
                        </div>
                        <hr className="w-full border-gray-200" />
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-md font-semibold">Tech Stack</h1>
                            <div className="w-full flex flex-wrap gap-1.5">
                                <button className="w-fit h-8 px-2.5 border rounded-sm bg-black text-white">React</button>
                                <button className="w-fit h-8 px-2.5 border rounded-sm bg-black text-white">Tailwind CSS</button>
                            </div>
                        </div>
                        <hr className="w-full border-gray-200" />
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-md font-semibold">Link</h1>
                            <div className="w-full flex items-center gap-2">
                                <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                                    <FaGithub className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 flex justify-center items-center rounded-sm bg-black hover:bg-gray-700 hover:cursor-pointer text-white">
                                    <FaExternalLinkAlt className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


const ContactSection = () => {
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

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
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
    )
}