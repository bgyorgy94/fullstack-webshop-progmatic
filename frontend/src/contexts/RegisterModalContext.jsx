import { createContext, useEffect } from "react";
import { useState } from "react";

export const RegisterModalContext = createContext();

export function RegisterModalProvider({children}){
    const [registerModalIsOpen,setRegisterModalIsOpen] = useState(false);
    useEffect(() => {
        setRegisterModalIsOpen(false);
    },[])
    return(
        <RegisterModalContext.Provider value={[registerModalIsOpen,setRegisterModalIsOpen]}>
            {children}
        </RegisterModalContext.Provider>
    )
    
}