import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
        {children}
        </SidebarContext.Provider>
    );
};
