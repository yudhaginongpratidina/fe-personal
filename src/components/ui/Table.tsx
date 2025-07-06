import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { HiViewColumns } from "react-icons/hi2";

export default function Table({ children }: { children: React.ReactNode }) {
    return (
        <table className="w-full">
            {children}
        </table>
    )
}


const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className="w-full">
            {children}
        </thead>
    )
}


const Row = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => {
    return (
        <tr className={`w-full ${className}`} {...props}>
            {children}
        </tr>
    )
}


const Head = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => {
    return (
        <th className={` h-12 px-2.5 border-b border-gray-300 ${className}`} {...props}>
            {children}
        </th>
    )
}


const Body = ({ children }: { children: React.ReactNode }) => {
    return (
        <tbody className="w-full">
            {children}
        </tbody>
    )
}


const Data = ({ children, colspan, className, ...props }: { colspan?: any, className?: string, children: React.ReactNode }) => {
    return (
        <td className={`h-12 px-2.5 border-b border-gray-300 ${className}`} colSpan={colspan} {...props}>
            {children}
        </td>
    )
}


const Navigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full flex justify-between items-center'>
            {children}
        </div>
    )
}


const NavigationItems = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex items-center gap-2'>
            {children}
        </div>
    )
}

const Pagination = ({ type, onClick, disabled }: { type: "previous" | "next", onClick: () => void, disabled: boolean }) => {
    return (
        <button onClick={onClick} disabled={disabled} className="h-8 w-8 border rounded-sm flex justify-center items-center hover:cursor-pointer">
            {type === "previous" && <IoIosArrowBack className="w-4 h-4" />}
            {type === "next" && <IoIosArrowForward className="w-4 h-4" />}
        </button>
    )
}


const ColumVisibility = ({ on_trigger, is_active, all_columns_checked, all_columns_on_change, columns }: {
    on_trigger: () => void,
    is_active: boolean,
    all_columns_checked: boolean,
    all_columns_on_change: (event: React.ChangeEvent<HTMLInputElement>) => void,
    columns: any,
}) => {
    return (
        <div className="relative">
            <button className="w-8 h-8 border rounded-sm flex justify-center items-center hover:cursor-pointer">
                <HiViewColumns className="w-4 h-4" onClick={on_trigger} />
            </button>
            {is_active && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-sm shadow-sm z-50">
                    <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={all_columns_checked} onChange={all_columns_on_change} className="rounded-sm" />
                            <span className="font-medium">All Columns</span>
                        </label>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {columns.getAllLeafColumns().map((column: any) => (
                            <div key={column.id} className="px-3 py-2 hover:bg-gray-50">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} className="rounded" />
                                    <span className="text-sm">{column.id}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {is_active && (
                <div className="fixed inset-0 z-40" onClick={on_trigger} />
            )}
        </div>
    )
}


const DataCount = ({ data }: { data: any }) => {
    return (
        <div className='h-8 border rounded-sm flex items-center px-2'>
            {data.getState().pagination.pageIndex + 1}/{' '}
            {data.getPageCount().toLocaleString()}
        </div>
    )
}


const DataShowSize = ({ sizes, value, onChange }: { sizes: number[], value: number, onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
    return (
        <select className='h-8 border rounded-sm hover:cursor-pointer focus:outline-none' value={value} onChange={onChange}>
            {sizes.map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    {pageSize}
                </option>
            ))}
        </select>
    )
}


const DataSearch = ({ search_by, table }: { search_by: string, table: any }) => {
    return (
        <input
            className='h-8 border rounded-sm px-2 focus:outline-none'
            placeholder={`Search ...`}
            value={(table.getColumn(search_by)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(search_by)?.setFilterValue(event.target.value)}
        />
    )
}


Table.Header = Header
Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.Data = Data
Table.Navigation = Navigation
Table.NavigationItems = NavigationItems
Table.ColumVisibility = ColumVisibility
Table.Pagination = Pagination
Table.DataCount = DataCount
Table.DataShowSize = DataShowSize
Table.DataSearch = DataSearch