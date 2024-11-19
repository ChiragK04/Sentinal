'use client';
import React, { useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useRouter } from 'next/navigation';

type DashboredProps = {
  selectedItem: string;
  selectedMenu: string;
};

const Header = ({ selectedItem, selectedMenu }: DashboredProps) => {
  const router = useRouter();

  // useEffect(() => {
  //   const paths: Record<string, string> = {
  //     ChatBots: '/overview/dashbored/bots',
  //     ChatBot: '/overview/dashbored/bots',
  //     Settings: '/settings/profile',
  //   };

  //   if (selectedItem === 'ChatBots') {
  //     router.push(
  //       selectedMenu === 'Bots'
  //         ? '/overview/dashbored/bots'
  //         : selectedMenu === 'create_bot'
  //         ? '/overview/dashbored/create_bot'
  //         : paths.ChatBots
  //     );
  //   } else if (selectedItem === 'ChatBot') {
  //     router.push(
  //       selectedMenu === 'History'
  //         ? '/overview/dashbored/history'
  //         : selectedMenu === 'Monitors'
  //         ? '/overview/dashbored/monitors'
  //         : paths.ChatBot
  //     );
  //   } else if (selectedItem === 'Settings') {
  //     router.push(
  //       selectedMenu === 'Profile Settings'
  //         ? '/settings/profile'
  //         : '/settings/security'
  //     );
  //   } else {
  //     router.push(paths[selectedItem] || '/overview/dashbored/bots');
  //   }
  // }, [selectedItem, selectedMenu, router]);

  const activeClass = (menu: string) => selectedMenu === menu ? 'text-primary font-bold' : 'text-muted-foreground';

  const renderNavigationMenu = () => {
    switch (selectedItem) {
      case 'ChatBots':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/bots" className={activeClass('Bots')}>
                Bots
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/create_bot" className={activeClass('create_bot')}>
                Create New Bot
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'ChatBot':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/history" className={activeClass('History')}>
                History
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/dashbored/monitors" className={activeClass('Monitors')}>
                Monitors
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      case 'Settings':
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/settings/profile" className={activeClass('Profile Settings')}>
                Profile Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/settings/security" className={activeClass('Security Settings')}>
                Security Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        );

      default:
        return (
          <NavigationMenuList className="flex space-x-24">
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/overview/general" className={activeClass('General Overview')}>
                General Overview
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink href="/docs" className={activeClass('Documentation')}>
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
          <NavigationMenu>{renderNavigationMenu()}</NavigationMenu>
          <div className="w-full mb-2">
            <hr className="border-secondary-foreground border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;