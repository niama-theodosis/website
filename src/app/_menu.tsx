"use client"

import Image from "next/image"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import type {Service} from "~/lib/schemas"
import {cn} from "~/lib/utils"

// MAIN ************************************************************************************************************************************
export default function Menu({services}: Props) {
  const navs = [
    {
      id: "services",
      href: "/prestations",
      label: "Prestations",
      items: services.map(({excerpt: text, id, image, name: label, uri}) => ({href: uri, id, image, label, text})),
    },
    {id: "about", href: "/qui-suis-je", label: "Qui suis-je?"},
    {id: "blog", href: "/blog", label: "Blog"},
    {id: "contact", href: "/contact", label: "Contact"},
  ]

  return (
    <NavigationMenu className="mt-2 hidden w-full lg:mt-0 lg:flex lg:w-auto">
      <NavigationMenuList>
        {navs.map(({href, id, items, label}) =>
          items ? (
            <NavigationMenuItem key={id}>
              <NavigationMenuTrigger className="text-base">{label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[900px] ">
                  {items.map(({href, id, image, label, text}) => (
                    <li key={id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={href}
                          className="flex select-none items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            width={1024}
                            height={1024}
                            className="aspect-square h-16 w-16 rounded-md object-cover"
                          />
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
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-base")}>{label}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// TYPES ***********************************************************************************************************************************
type Props = {services: Service[]}