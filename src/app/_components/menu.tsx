"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import type {Nav} from "./header"

// MAIN ************************************************************************************************************************************
export const Menu = React.forwardRef<React.ElementRef<typeof NavigationMenu>, MenuProps>(({navs, ...props}, ref) => {
  return (
    <NavigationMenu ref={ref} {...props}>
      <NavigationMenuList>
        {navs.map(({href, id, items, label}) =>
          items ? (
            <NavigationMenuItem key={id}>
              <NavigationMenuTrigger className="lg:text-base">{label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[900px] ">
                  {items.map(({href, id, image, label, text}) => (
                    <li key={id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={href}
                          className="flex select-none items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <Image src={image.url} alt={image.name} height={64} width={64} className="rounded-md object-cover" />
                          <div className="space-y-2">
                            <div className="font-heading text-sm font-bold leading-none">{label}</div>
                            <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{text}</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={id}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "lg:text-base")}>{label}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
})
Menu.displayName = "Menu"

// TYPES ***********************************************************************************************************************************
export type MenuProps = React.ComponentPropsWithoutRef<typeof NavigationMenu> & {navs: Nav[]}
