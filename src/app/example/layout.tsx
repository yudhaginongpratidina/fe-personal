import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Example",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full min-h-screen flex justify-center items-center p-4">
            {children}
        </main>
    )
}