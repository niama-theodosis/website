import {Slot} from "@radix-ui/react-slot"
import * as React from "react"
import {tv, type VariantProps} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const BUTTON = tv({
  base: `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50`,
  variants: {
    variant: {
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-secondary underline-offset-4 hover:underline",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      success: "bg-success text-success-foreground hover:bg-success/90",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8 text-base",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "default",
  },
})

// ROOT ************************************************************************************************************************************
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, size, asChild = false, ...props}, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={BUTTON({variant, size, className})} ref={ref} {...props} />
})
Button.displayName = "Button"

// TYPES ***********************************************************************************************************************************
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof BUTTON> {
  asChild?: boolean
}
