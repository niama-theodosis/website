import Link from "next/link"
import React from "react"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MoreButton = React.forwardRef<HTMLButtonElement, MoreButtonProps>(({href, ...props}, ref) => {
  return (
    <Button ref={ref} asChild {...props}>
      <Link href={href}>
        <span className="hidden lg:block">En savoir plus</span>
        <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
      </Link>
    </Button>
  )
})
MoreButton.displayName = "MoreButton"

// TYPES ***********************************************************************************************************************************
export type MoreButtonProps = Omit<ButtonProps, "asChild" | "children"> & {href: string}
