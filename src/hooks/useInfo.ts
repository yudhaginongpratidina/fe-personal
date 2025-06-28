import { useState } from "react";

export interface InfoState {
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const useInfo = () => {

    const [info, setInfo] = useState<InfoState>({
        isLoading: false,
        isError: false,
        message: "",
    });

    const handleInfo = ({ isLoading, isError, message }: InfoState) => {
        setInfo({ isLoading, isError, message });
    };

    const handleClearInfo = () => {
        setTimeout(() => {
            setInfo({ isLoading: false, isError: false, message: "" });
        }, 3000);
    };

    return { info, handleInfo, handleClearInfo };

}

export default useInfo