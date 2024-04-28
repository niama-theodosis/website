import * as React from "react"
import {tv, type VariantProps} from "tailwind-variants"
import {HEADING} from "./typography"

// STYLES **********************************************************************************************************************************
export const SECTION = tv({
  slots: {
    ASIDE: `SECTION_ASIDE grid grid-cols-12 col-span-12 
    lg:col-span-5`,
    CONTENT: `SECTION_CONTENT grid max-w-screen-xl mx-auto space-y-8 grid-cols-12
    lg:space-x-8 lg:space-y-0`,
    HEADER: `SECTION_HEADER flex flex-col gap-4 text-center max-w-2xl mx-auto`,
    MAIN: `SECTION_MAIN flex flex-col gap-8 col-span-12 
    lg:col-span-7 lg:only:col-span-12`,
    ROOT: `SECTION flex flex-col px-8 py-16 w-full`,
    TITLE: "SECTION_TITLE",
    TAGLINE: `SECTION_TAGLINE text-gray-600 text-lg`,
  },
  variants: {
    level: {
      1: {TITLE: HEADING({level: 1})},
      2: {TITLE: HEADING({level: 2})},
      3: {TITLE: HEADING({level: 3})},
      4: {TITLE: HEADING({level: 4})},
      5: {TITLE: HEADING({level: 5})},
      6: {TITLE: HEADING({level: 6})},
    },
    variant: {
      default: {ROOT: `bg-white`},
      accent: {ROOT: `bg-accent`},
    },
  },
  defaultVariants: {
    level: 2,
    variant: "accent",
  },
})

const {ASIDE, CONTENT, HEADER, MAIN, ROOT, TAGLINE, TITLE} = SECTION()

// ASIDE ***********************************************************************************************************************************
export const SectionAside = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({className, ...props}, ref) => (
  <aside ref={ref} className={ASIDE({className})} {...props} />
))
SectionAside.displayName = "SectionAside"

// ROOT ************************************************************************************************************************************
export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & VariantProps<typeof SECTION>>(
  ({className, variant, ...props}, ref) => <section ref={ref} className={ROOT({variant, className})} {...props} />
)
Section.displayName = "Section"

// CONTENT *********************************************************************************************************************************
export const SectionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={CONTENT({className})} {...props} />
))
SectionContent.displayName = "SectionContent"

// HEADER **********************************************************************************************************************************
export const SectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <div ref={ref} className={HEADER({className})} {...props} />
))
SectionHeader.displayName = "SectionHeader"

// MAIN ************************************************************************************************************************************
export const SectionMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
  <main ref={ref} className={MAIN({className})} {...props} />
))
SectionMain.displayName = "SectionMain"

// TAGLINE *********************************************************************************************************************************
export const SectionTagline = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, ...props}, ref) => <p ref={ref} className={TAGLINE({className})} {...props} />
)
SectionTagline.displayName = "SectionTagline"

// TITLE ***********************************************************************************************************************************
export const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof SECTION>>(
  ({className, level, ...props}, ref) => <h2 ref={ref} className={TITLE({level, className})} {...props} />
)
SectionTitle.displayName = "SectionTitle"
