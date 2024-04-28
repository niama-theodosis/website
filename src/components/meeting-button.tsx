import {getServiceVariant} from "@/lib/utils"
import Link from "next/link"
import React from "react"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MeetingButton = React.forwardRef<HTMLButtonElement, MeetingButtonProps>(({service, size, variant, ...props}, ref) => {
  return (
    <Button ref={ref} asChild size={size} variant={variant ?? getServiceVariant(service)} {...props}>
      <Link href={`/rendez-vous${service ? "/" + service : ""}`}>
        <span className="i-lucide-calendar-heart h-4 w-4"></span>
        {size !== "icon" && <span className="ml-2">Prendre rendez-vous</span>}
      </Link>
    </Button>
  )
})
MeetingButton.displayName = "MeetingButton"

// TYPES ***********************************************************************************************************************************
export type MeetingButtonProps = Omit<ButtonProps, "asChild" | "children"> & {service?: string}
