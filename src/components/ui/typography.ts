import {tv} from "tailwind-variants"

// HEADING *********************************************************************************************************************************
export const HEADING = tv({
  base: `font-heading scroll-m-20 font-bold leading-none tracking-tight text-foreground`,
  variants: {
    level: {
      1: `text-4xl md:text-5xl xl:text-6xl`,
      2: `text-3xl md:text-4xl xl:text-5xl`,
      3: `text-2xl`,
      4: `text-xl`,
      5: `text-lg`,
      6: `text-base`,
    },
  },
})

// P ***************************************************************************************************************************************
export const P = tv({base: `font-light text-gray-500 sm:text-xl`})
