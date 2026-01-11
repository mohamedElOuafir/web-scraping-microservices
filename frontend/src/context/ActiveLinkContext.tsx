import { createContext, type ReactNode, useContext, useState } from "react";


type ActiveLink = {
    activeLink : string;
    updateActiveLink(path: string): void;
} 


const activeLinkContext = createContext<ActiveLink | undefined>(undefined);


export const ActiveLinkProvider = ({children}: {children: ReactNode}) => {

    const [activeLink, setActiveLink] = useState("");

    const updateActiveLink = (path: string) => setActiveLink(path);

    return (
        <activeLinkContext.Provider value={{activeLink, updateActiveLink}}>
            {children}
        </activeLinkContext.Provider>
    )

} 



export const useActiveLink = () => {
    const context = useContext(activeLinkContext);

    if(!context)
        throw new Error("useActiveLink should be used on ActiveLinkProvider");
    return context;
} 