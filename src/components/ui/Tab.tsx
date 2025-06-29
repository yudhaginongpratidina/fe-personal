interface TabProps {
    children: React.ReactNode
}


interface NavigationProps {
    title: string
    children: React.ReactNode
}


interface NavigationItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    id: string
    name: string
    tab_active: string
    icon?: React.ReactNode
}


interface ContentProps {
    id: string
    tab_active: string
    children: React.ReactNode
}


export default function Tab({ children }: TabProps) {
    return (
        <div className="w-full flex flex-col md:flex-row gap-4">
            {children}
        </div>
    )
}


const Navigation = ({ title, children }: NavigationProps) => {
    return (
        <div className="w-full md:max-w-sm h-fit p-4 rounded-sm flex flex-col gap-2 justify-start items-start shadow-sm drop-shadow-sm bg-white">
            <h1 className="text-lg font-medium capitalize">{title}</h1>
            <hr className="w-full border-gray-200" />
            {children}
        </div>
    )
}


const NavigationItem = ({ id, tab_active, name, icon, ...props }: NavigationItemProps) => {

    const tab_class = "w-full p-2 flex justify-start items-center gap-2 capitalize rounded-sm"
    const tab_active_class = "bg-black text-white hover:cursor-pointer"
    const tab_inactive_class = "hover:bg-gray-200 hover:cursor-pointer"

    return (
        <button className={`${tab_class} ${id == tab_active ? tab_active_class : tab_inactive_class}`} {...props}>
            {icon}
            <span>{name}</span>
        </button>
    )
}

const Content = ({id, tab_active, children} : ContentProps) => {
    return (
        <>
            {id == tab_active && (
                <div className="w-full h-fit p-4 rounded-sm shadow-sm drop-shadow-sm flex flex-col gap-4 bg-white">
                    {children}
                </div>
            )}
        </>
    )
}

Tab.Navigation = Navigation
Tab.NavigationItem = NavigationItem
Tab.Content = Content