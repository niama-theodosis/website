import {cn} from "@/lib/utils"
import React from "react"
import {useFormStatus} from "react-dom"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const Submit = React.forwardRef<HTMLButtonElement, SubmitProps>(({className, label, ...props}, ref) => {
  const {pending} = useFormStatus()

  return (
    <Button ref={ref} type="submit" disabled={pending} className={cn("flex gap-2", className)} {...props}>
      <span className={cn("h-4 w-4", pending ? "i-lucide-loader animate-spin" : "i-lucide-send")}></span>
      <span>{label}</span>
    </Button>
  )
})
Submit.displayName = "Submit"

// TYPES ***********************************************************************************************************************************
export type SubmitProps = Omit<ButtonProps, "asChild" | "children" | "type" | "disabled"> & {label: string}
