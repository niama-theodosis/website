import {forwardRef, type HTMLAttributes} from "react"
import {tv} from "tailwind-variants"

const PROSE = tv({base: "prose prose-headings:font-heading max-w-none text-justify"})

// PROSE ***********************************************************************************************************************************
export const Prose = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({children, className, ...props}, ref) => (
  <article ref={ref} className={PROSE({className})} {...props}>
    {children}
  </article>
))
Prose.displayName = "Prose"
