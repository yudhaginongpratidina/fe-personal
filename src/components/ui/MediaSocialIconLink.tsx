import Link from "next/link"

interface MediaSocialIconLinkProps {
    href: string
    icon: React.ReactNode
}

export default function MediaSocialIconLink({ href, icon }: MediaSocialIconLinkProps) {
    return (
        <Link href={href} target="_blank">
            <button className="w-8 h-8 rounded-full flex justify-center items-center hover:cursor-pointer bg-black text-white">
                {icon}
            </button>
        </Link>
    )
}