import {cn} from "@/lib/utils"
import React from "react"

// PROSE ***********************************************************************************************************************************
export const Prose = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({className, content, ...props}, ref) => (
  <article
    ref={ref}
    dangerouslySetInnerHTML={{__html: content ?? ""}}
    className={cn("prose prose-headings:font-heading max-w-none text-justify", className)}
    {...props}
  />
))
Prose.displayName = "Prose"
