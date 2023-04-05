
import { createContext, useState } from "react";

const Success = createContext({});

export const SuccessProvider = ({ children }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <Success.Provider value={{ showSuccess, setShowSuccess }}>
            {children}  
        </Success.Provider>
    )
}

export default Success;