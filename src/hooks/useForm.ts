import { useState, ChangeEvent } from "react";

const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        setValues,
        handleChange,
        resetForm,
    };
};

export default useForm;
