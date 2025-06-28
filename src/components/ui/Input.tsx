const Label = ({ id, name, required }: { id: string, name: string, required?: boolean }) => {
    return (
        <label htmlFor={id} className="flex items-center gap-1">
            <span className="text-sm">{name}</span>
            {required && <span className="text-red-500">*</span>}
        </label>
    )
}

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string,
    type: string,
    label?: string,
    required?: boolean,
    isLoading: boolean,
    isError: boolean
}

export default function Input({ id, type, label, required, isLoading, isError, ...props }: Input) {
    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && <Label id={id} name={label} required={required} />}
            <input
                id={id}
                name={id}
                type={type}
                disabled={isLoading}
                className={`w-full h-12 px-2.5 border rounded-sm border-gray-200 focus:border-gray-400 focus:outline-none duration-150 ${isLoading && "hover:cursor-not-allowed"} ${isError && "border-red-500"}`}
                {...props}
            />
        </div>
    )
}