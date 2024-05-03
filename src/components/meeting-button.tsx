import {getServiceColor} from "@/lib/utils"
import Link from "next/link"
import React from "react"
import {Button, type ButtonProps} from "./ui/button"

// ROOT ************************************************************************************************************************************
export const MeetingButton = React.forwardRef<HTMLButtonElement, MeetingButtonProps>(({color, service, size, ...props}, ref) => {
  return (
    <Button ref={ref} asChild size={size} color={color ?? getServiceColor(service)} {...props}>
      <Link href={`/rendez-vous${service ? "/" + service : ""}`}>
        <span className="i-lucide-calendar-heart h-4 w-4"></span>
        {size === "hybrid" && <span className="sr-only lg:not-sr-only lg:ml-2 lg:whitespace-nowrap">Prendre rendez-vous</span>}
        {size !== "hybrid" && size !== "icon" && <span className="ml-2">Prendre rendez-vous</span>}
      </Link>
    </Button>
  )
})
MeetingButton.displayName = "MeetingButton"

// TYPES ***********************************************************************************************************************************
export type MeetingButtonProps = Omit<ButtonProps, "asChild" | "children"> & {service?: string}
