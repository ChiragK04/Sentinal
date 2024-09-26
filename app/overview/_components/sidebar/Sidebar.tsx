'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BotIcon, BoxIcon, CircleDotDashedIcon, HomeIcon, LogOut, MessageCircleQuestionIcon, SettingsIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type SidebarProps = {
    onSelectItem: (item: string) => void;
};


const Sidebar = ({ onSelectItem }: SidebarProps) => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<string>('Dashbored');

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("login_id");
        router.push("/auth/sign-in");
    };

    const handleNavigation = (item: string, route: string) => {
        setActiveItem(item);
        onSelectItem(item);
        // router.push(route);
    };

    return (
        <div className="min-w-[16rem] h-full bg-primary text-primary-foreground p-4">
            <div className="p-2 flex flex-col justify-between h-full">

                {/* Logo Section */}
                <div className="mb-4 h-24">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                            <CircleDotDashedIcon size={34} className="text-primary-foreground" />
                            <h1 className="text-xl font-semibold text-primary-foreground">Sentinal</h1>
                        </div>
                        <div className="w-full my-2">
                            <hr className="border-primary-foreground border" />
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className="flex-grow flex flex-col gap-2 my-4">
                    <div 
                        className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${activeItem === 'Dashbored' ? 'bg-secondary text-secondary-foreground' : ''}`} 
                        onClick={() => handleNavigation('Dashbored', '/overview/dashbored')}
                    >
                        <HomeIcon className={`${activeItem === 'Dashbored' ? 'text-secondary-foreground' : ''}`} />
                        <p className={`${activeItem === 'Dashbored' ? 'text-secondary-foreground' : ''}`}>Dashbored</p>
                    </div>
                    <div 
                        className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${activeItem === 'ChatBots' ? 'bg-secondary text-secondary-foreground' : ''}`} 
                        onClick={() => handleNavigation('ChatBots', '/overview/chatbots')}
                    >
                        <BotIcon className={`${activeItem === 'ChatBots' ? 'text-secondary-foreground' : ''}`} />
                        <p className={`${activeItem === 'ChatBots' ? 'text-secondary-foreground' : ''}`}>ChatBots</p>
                    </div>
                    <div 
                        className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${activeItem === 'Api' ? 'bg-secondary text-secondary-foreground' : ''}`} 
                        onClick={() => handleNavigation('Api', '/overview/api')}
                    >
                        <BoxIcon className={`${activeItem === 'Api' ? 'text-secondary-foreground' : ''}`} />
                        <p className={`${activeItem === 'Api' ? 'text-secondary-foreground' : ''}`}>Api</p>
                    </div>
                    <div 
                        className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${activeItem === 'Settings' ? 'bg-secondary text-secondary-foreground' : ''}`} 
                        onClick={() => handleNavigation('Settings', '/overview/settings')}
                    >
                        <SettingsIcon className={`${activeItem === 'Settings' ? 'text-secondary-foreground' : ''}`} />
                        <p className={`${activeItem === 'Settings' ? 'text-secondary-foreground' : ''}`}>Settings</p>
                    </div>
                    <div 
                        className={`flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-secondary/80 hover:text-secondary-foreground ${activeItem === 'Help & Support' ? 'bg-secondary text-secondary-foreground' : ''}`} 
                        onClick={() => handleNavigation('Help & Support', '/overview/help')}
                    >
                        <MessageCircleQuestionIcon className={`${activeItem === 'Help & Support' ? 'text-secondary-foreground' : ''}`} />
                        <p className={`${activeItem === 'Help & Support' ? 'text-secondary-foreground' : ''}`}>Help & Support</p>
                    </div>
                </div>

                <div className="w-full my-4">
                    <hr className="border-primary-foreground border" />
                </div>

                {/* User Info and Logout Section */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xs font-semibold text-primary-foreground">User_name</h1>
                            <p className="text-xs text-muted">Welcome back!</p>
                        </div>
                    </div>
                    <div
                        className="cursor-pointer flex gap-1 items-center"
                        onClick={handleLogout}
                    >
                        <LogOut className="text-primary-foreground" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;