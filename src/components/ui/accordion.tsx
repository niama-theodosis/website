"use client"

import {cn} from "@/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as React from "react"
import {tv, type VariantProps} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const ACCORDION = tv({
  slots: {
    TRIGGER: `text-gray-600 text-lg font-heading flex flex-1 items-center justify-between py-4 font-bold transition-all 
   [&[data-state=open]>svg]:rotate-180`,
  },
  variants: {
    variant: {
      primary: {TRIGGER: `hover:text-primary`},
      secondary: {TRIGGER: `hover:text-secondary`},
    },
  },
  defaultVariants: {
    variant: "secondary",
  },
})

const {TRIGGER} = ACCORDION()

// ROOT ************************************************************************************************************************************
export const Accordion = AccordionPrimitive.Root

// ITEM ************************************************************************************************************************************
export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({className, ...props}, ref) => <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />)
AccordionItem.displayName = "AccordionItem"

// TRIGGER *********************************************************************************************************************************
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & VariantProps<typeof TRIGGER>
>(({className, children, variant, ...props}, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={TRIGGER({variant, className})} {...props}>
      {children}
      <span className="i-lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"></span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// CONTENT *********************************************************************************************************************************
export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName
