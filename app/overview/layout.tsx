'use client'
import { useState } from "react";
import Header from "./_components/sub_header/Header";
import Sidebar from "./_components/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<string>("Dashbored");

    const handleSelectItem = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <div className='w-full h-full flex'>
            <Sidebar onSelectItem={handleSelectItem} />
            <div className="p-4 bg-muted flex flex-col w-full">
                <div className="h-28">
                    <Header selectedItem={selectedItem} />
                </div>
                <div className="bg-muted p-2 h-[calc(100%-112px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;