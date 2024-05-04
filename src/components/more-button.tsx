import Link from "next/link"
import {forwardRef} from "react"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MoreButton = forwardRef<HTMLButtonElement, MoreButtonProps>(({href, label = "En savoir plus", ...props}, ref) => {
  return (
    <Button ref={ref} asChild {...props}>
      <Link href={href}>
        <span>{label}</span>
        <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
      </Link>
    </Button>
  )
})
MoreButton.displayName = "MoreButton"

// TYPES ***********************************************************************************************************************************
export type MoreButtonProps = Omit<ButtonProps, "asChild" | "children"> & {href: string; label?: string}
