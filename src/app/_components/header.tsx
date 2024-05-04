import {MeetingButton} from "@/components/meeting-button"
import {SocialButtons} from "@/components/social-buttons"
import {BUTTON, Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {fetchContact, fetchServices} from "@/lib/db"
import type {ImageDto} from "@/lib/schemas"
import {cn} from "@/lib/utils"
import Link from "next/link"
import {Fragment, forwardRef, type HTMLAttributes} from "react"
import {Menu} from "./menu"

// ROOT ************************************************************************************************************************************
export const Header = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(async ({className, ...props}, ref) => {
  const [{name}, services] = await Promise.all([fetchContact(), fetchServices()])

  const navs: Nav[] = [
    {
      id: "services",
      href: "/prestations",
      label: "Prestations",
      items: services.map(({excerpt: text, id, image, name: label, uri}) => ({href: uri, id: `${id}`, image, label, text})),
    },
    {id: "about", href: "/qui-suis-je", label: "Qui suis-je?"},
    {id: "blog", href: "/blog", label: "Blog"},
    {id: "contact", href: "/contact", label: "Contact"},
  ]

  return (
    <header ref={ref} className={cn("border-b border-transparent bg-white transition-all", className)} {...props}>
      <div className="container mx-auto px-4 py-2 sm:py-4 xl:px-8">
        <div className="flex items-center justify-between">
          <Button variant="link" className="p-0 font-heading text-3xl font-bold text-black hover:no-underline lg:text-4xl" asChild>
            <Link href="/">{name}</Link>
          </Button>
          <Menu navs={navs} className="hidden md:flex" />
          <div className="flex items-center gap-1 lg:gap-2">
            <MeetingButton color="primary" size="hybrid" />
            <SocialButtons className="hidden sm:flex" />
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" color="tertiary" className="order-1 md:hidden">
                  <span className="i-lucide-panel-left h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg">
                  {navs.map(({id, href, label, items}, i) => (
                    <Fragment key={id}>
                      {i > 0 && <Separator />}
                      {items ? (
                        <>
                          <Label className={BUTTON({variant: "label", size: "lg", className: "font-bold"})}>
                            {label}
                          </Label>
                          {items.map(({id, label, href}) => (
                            <SheetClose key={id} asChild>
                              <Button variant="ghost" asChild>
                                <Link href={href}>{label}</Link>
                              </Button>
                            </SheetClose>
                          ))}
                        </>
                      ) : (
                        <SheetClose key={id} asChild>
                          <Button variant="ghost" size="lg" asChild className="font-bold"> 
                            <Link href={href}>{label}</Link>
                          </Button>
                        </SheetClose>
                      )}
                    </Fragment>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
})
Header.displayName = "Header"

// TYPES ***********************************************************************************************************************************
export type Nav = {id: string; href: string; label: string; items?: (Nav & {image: ImageDto; text: string})[]}
