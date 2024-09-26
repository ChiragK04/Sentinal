'use client'
import React, { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useRouter } from 'next/navigation';

type DashboredProps = {
  selectedItem: string;
};

const Dashbored = ({ selectedItem }: DashboredProps) => {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    switch (selectedItem) {
      case 'ChatBots':
        setActiveMenu('Bots');
        router.push('/overview/dashbored/bots');
        break;
      case 'Dashbored':
        setActiveMenu('Nav-1');
        router.push('/overview/dashbored/dump');
        break;
      case 'Settings':
        setActiveMenu('Profile Settings');
        router.push('/settings/profile');
        break;
      default:
        setActiveMenu('General Overview');
        router.push('/overview/general');
    }
  }, [selectedItem, router]);

  const handleMenuClick = (menu: string, href: string) => {
    setActiveMenu(menu);
    router.push(href); 
  };

  const renderNavigationMenu = () => {
    switch (selectedItem) {
      case 'ChatBots':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Bots', '/overview/dashbored/bots')}
                className={activeMenu === 'Bots' ? 'text-primary' : 'text-muted-foreground'}
              >
                Bots
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Create New Bot', '/overview/dashbored/create_bot')}
                className={activeMenu === 'Create New Bot' ? 'text-primary' : 'text-muted-foreground'}
              >
                Create New Bot
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Analytics', '/overview/dashbored/chats')}
                className={activeMenu === 'Analytics' ? 'text-primary' : 'text-muted-foreground'}
              >
                Chats
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );
      case 'Dashbored':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Nav-1', '/overview/dashbored/dump')}
                className={activeMenu === 'Nav-1' ? 'text-primary' : 'text-muted-foreground'}
              >
                Nav-1
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Nav-2', '/overview/chatbots/analytics')}
                className={activeMenu === 'Nav-2' ? 'text-primary' : 'text-muted-foreground'}
              >
                Nav-2
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );
      case 'Settings':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Profile Settings', '/settings/profile')}
                className={activeMenu === 'Profile Settings' ? 'text-primary' : 'text-muted-foreground'}
              >
                Profile Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Security Settings', '/settings/security')}
                className={activeMenu === 'Security Settings' ? 'text-primary' : 'text-muted-foreground'}
              >
                Security Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );
      default:
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('General Overview', '/overview/general')}
                className={activeMenu === 'General Overview' ? 'text-primary' : 'text-muted-foreground'}
              >
                General Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=' cursor-pointer'>
              <NavigationMenuLink
                onClick={() => handleMenuClick('Documentation', '/docs')}
                className={activeMenu === 'Documentation' ? 'text-primary' : 'text-muted-foreground'}
              >
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );
    }
  };

  return (
    <div className="p-2 w-full h-full mb-4">
      <div className="h-full flex flex-col justify-between">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">{selectedItem}</h1>
        </div>
        <div className="text-muted-foreground">
          <NavigationMenu>
            {renderNavigationMenu()}
          </NavigationMenu>
          <div className="w-full mb-2">
            <hr className="border-secondary-foreground border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbored;