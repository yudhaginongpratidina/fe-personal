export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4 px-4">
            {children}
        </main>
    );
}