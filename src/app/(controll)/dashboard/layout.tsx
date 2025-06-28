import { Metadata } from "next";

const metadata: Metadata = {
    title: "Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}