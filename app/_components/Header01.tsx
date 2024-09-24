'use client';

import { ModeToggle } from '@/components/shared/Mode';
import { Card } from '@/components/ui/card';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleSlashedIcon } from 'lucide-react';
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("login_id"); 
        router.push("/auth/sign-in"); 
    };

    return (
        <div className="p-4">
            <Card className="flex items-center justify-between py-2 px-4">
                <div>
                </div>
                <div>
                    <div className="rounded-md flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger>
                                    <ModeToggle />
                                </TooltipTrigger>
                                <TooltipContent>Night Mode</TooltipContent>
                            </Tooltip>
                            <div className="border-foreground h-[34px] border mx-4"></div>

                            <Tooltip>
                                <TooltipTrigger>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    <span>Billing</span>
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    <span>Settings</span>
                                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Keyboard className="mr-2 h-4 w-4" />
                                                    <span>Keyboard shortcuts</span>
                                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    <span>Team</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>
                                                        <UserPlus className="mr-2 h-4 w-4" />
                                                        <span>Invite users</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                <span>Email</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                                <span>Message</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                <span>More...</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuItem>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    <span>New Team</span>
                                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Github className="mr-2 h-4 w-4" />
                                                <span>GitHub</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <LifeBuoy className="mr-2 h-4 w-4" />
                                                <span>Support</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem disabled>
                                                <Cloud className="mr-2 h-4 w-4" />
                                                <span>API</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TooltipTrigger>
                                <TooltipContent>Account</TooltipContent>
                            </Tooltip>

                            <div className="hidden sm:block">
                                <h1 className='text-xs font-semibold'>User_name</h1>
                                <p className='text-xs'>Welcome back!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}