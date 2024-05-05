import {forwardRef, type HTMLAttributes} from "react"
import {tv} from "tailwind-variants"
import {HEADING} from "./typography"

// STYLES **********************************************************************************************************************************
export const CARD = tv({
  slots: {
    CONTENT: "flex-1 flex flex-col gap-4",
    DESCRIPTION: "text-sm text-muted-foreground",
    FOOTER: "flex items-center gap-1.5",
    HEADER: "flex flex-col gap-1.5",
    ROOT: "flex flex-col gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm",
    TITLE: HEADING({level: 3}),
  },
})
const {CONTENT, DESCRIPTION, FOOTER, HEADER, ROOT, TITLE} = CARD()

// CONTENT *********************************************************************************************************************************
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={CONTENT({className})} {...props} />
))
CardContent.displayName = "CardContent"

// DESCRIPTION *****************************************************************************************************************************
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({className, ...props}, ref) => (
  <p ref={ref} className={DESCRIPTION({className})} {...props} />
))
CardDescription.displayName = "CardDescription"

// FOOTER **********************************************************************************************************************************
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={FOOTER({className})} {...props} />
))
CardFooter.displayName = "CardFooter"

// HEADER **********************************************************************************************************************************
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={HEADER({className})} {...props} />
))
CardHeader.displayName = "CardHeader"

// ROOT ************************************************************************************************************************************
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={ROOT({className})} {...props} />
))
Card.displayName = "Card"

// TITLE ***********************************************************************************************************************************
export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({className, ...props}, ref) => (
  <h3 ref={ref} className={TITLE({className})} {...props} />
))
CardTitle.displayName = "CardTitle"
