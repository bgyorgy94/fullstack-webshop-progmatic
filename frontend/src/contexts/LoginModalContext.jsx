import { createContext, useEffect } from "react";
import { useState } from "react";

export const LoginModalContext = createContext();

export function LoginModalProvider({children}){
    const [loginModalIsOpen,setLoginModalIsOpen] = useState(false);
    useEffect(() => {
        setLoginModalIsOpen(false);
    },[])
    return(
        <LoginModalContext.Provider value={[loginModalIsOpen,setLoginModalIsOpen]}>
            {children}
        </LoginModalContext.Provider>
    )
    
}