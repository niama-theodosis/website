import * as Primitive from "@radix-ui/react-navigation-menu"

import {cn} from "@/lib/utils"
import {forwardRef, type ComponentPropsWithoutRef, type ElementRef} from "react"
import {tv} from "tailwind-variants"

// ROOT ************************************************************************************************************************************
export const NavigationMenu = forwardRef<ElementRef<typeof Primitive.Root>, ComponentPropsWithoutRef<typeof Primitive.Root>>(
  ({className, children, ...props}, ref) => (
    <Primitive.Root ref={ref} className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
      <NavigationMenuViewport />
    </Primitive.Root>
  )
)
NavigationMenu.displayName = Primitive.Root.displayName

// LIST ************************************************************************************************************************************
export const NavigationMenuList = forwardRef<ElementRef<typeof Primitive.List>, ComponentPropsWithoutRef<typeof Primitive.List>>(
  ({className, ...props}, ref) => (
    <Primitive.List ref={ref} className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props} />
  )
)
NavigationMenuList.displayName = Primitive.List.displayName

// ITEM ************************************************************************************************************************************
export const NavigationMenuItem = Primitive.Item

// TRIGGER *********************************************************************************************************************************
export const navigationMenuTriggerStyle = tv({
  base: `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors 
  hover:bg-accent hover:text-accent-foreground focus:bg-accent 
  focus:text-accent-foreground focus:outline-none 
  disabled:pointer-events-none disabled:opacity-50 
  data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`,
})

export const NavigationMenuTrigger = forwardRef<ElementRef<typeof Primitive.Trigger>, ComponentPropsWithoutRef<typeof Primitive.Trigger>>(
  ({className, children, ...props}, ref) => (
    <Primitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
      {children}
      <span
        className="i-lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </Primitive.Trigger>
  )
)
NavigationMenuTrigger.displayName = Primitive.Trigger.displayName

// CONTENT *********************************************************************************************************************************
export const NavigationMenuContent = forwardRef<ElementRef<typeof Primitive.Content>, ComponentPropsWithoutRef<typeof Primitive.Content>>(
  ({className, ...props}, ref) => (
    <Primitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
        className
      )}
      {...props}
    />
  )
)
NavigationMenuContent.displayName = Primitive.Content.displayName

// LINK ************************************************************************************************************************************
export const NavigationMenuLink = Primitive.Link

// VIEWPORT ********************************************************************************************************************************
export const NavigationMenuViewport = forwardRef<
  ElementRef<typeof Primitive.Viewport>,
  ComponentPropsWithoutRef<typeof Primitive.Viewport>
>(({className, ...props}, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <Primitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = Primitive.Viewport.displayName

// INDICATOR *******************************************************************************************************************************
export const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof Primitive.Indicator>,
  ComponentPropsWithoutRef<typeof Primitive.Indicator>
>(({className, ...props}, ref) => (
  <Primitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </Primitive.Indicator>
))
NavigationMenuIndicator.displayName = Primitive.Indicator.displayName
