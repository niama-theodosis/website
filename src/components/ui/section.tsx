import * as React from "react"
import {tv} from "tailwind-variants"

// STYLES **********************************************************************************************************************************
export const SECTION = tv({
  slots: {
    ASIDE: "",
    BASE: "bg-background flex",
    CONTENT: "mx-auto max-w-screen-xl flex flex-col px-4 py-8 gap-12 lg:px-6 lg:py-16",
    HEADER: "text-center flex flex-col gap-4",
    TITLE: "text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl font-heading",
    TAGLINE: "font-light text-gray-500 dark:text-gray-400 sm:text-xl",
  },
})

const {ASIDE, BASE, CONTENT, HEADER, TAGLINE, TITLE} = SECTION()

// export default function Seection({className: C = {}, tagline, title}: Props) {
//   return (
//     <section className={BASE({className: C.BASE})}>
//       <div className={CONTENT({className: C.CONTENT})}>
//         {title && tagline && (
//           <div className={HEADER({className: C.HEADER})}>
//             <h2 className={TITLE({className: C.TITLE})}>{title}</h2>
//             <p set:html={tagline} class={TAGLINE({className: C.TAGLINE})} />
//           </div>
//         )}
//         {children}
//       </div>
//       {Astro.slots.has("aside") && (
//         <aside class={ASIDE({class: C.ASIDE})}>
//           <slot name="aside" />
//         </aside>
//       )}
//     </section>
//   )
// }

// ASIDE ***********************************************************************************************************************************
export const SectionAside = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({className, ...props}, ref) => (
  <aside ref={ref} className={ASIDE({className})} {...props} />
))
SectionAside.displayName = "SectionAside"

// BASE ************************************************************************************************************************************
export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({className, ...props}, ref) => (
  <section ref={ref} className={BASE({className})} {...props} />
))
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

// TAGLINE *********************************************************************************************************************************
export const SectionTagline = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, ...props}, ref) => <p ref={ref} className={TAGLINE({className})} {...props} />
)
SectionTagline.displayName = "SectionTagline"

// TITLE ***********************************************************************************************************************************
export const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({className, ...props}, ref) => (
  <h2 ref={ref} className={TITLE({className})} {...props} />
))
SectionTitle.displayName = "SectionTitle"
