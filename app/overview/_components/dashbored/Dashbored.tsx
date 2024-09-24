import { ModeToggle } from '@/components/shared/Mode'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

type Props = {}

const Dashbored = (props: Props) => {
  return (
    <div className="p-2 w-full h-full mb-4">
      <div className="h-full flex flex-col justify-between">
        <div className='mb-4'>
          <h1 className=' text-3xl font-semibold'>ChatBots</h1>
        </div>
        <div className="text-muted-foreground">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-24">
              <NavigationMenuItem >
                <Link href="/overview/dashbored/bots" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Bots
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='text-primary'>
                <Link href="/overview/dashbored/create_bot" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Create New Bot
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Customisation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/overview/dashbored/chats" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Documents
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/overview/dashbored/chats" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Chats
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink>
                    Analyziz
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="w-full mb-2">
            <hr className="border-secondary-foreground border" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbored