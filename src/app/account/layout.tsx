import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full min-h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-sm flex flex-col gap-4">
                {children}
            </div>
        </main>
    );
}