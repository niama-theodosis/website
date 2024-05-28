import {clsx, type ClassValue} from "clsx"
import D from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import type {FieldErrors, FieldValues} from "react-hook-form"
import {twMerge} from "tailwind-merge"
import type {ZodError} from "zod"
import type {Service} from "./pocketbase/schemas"

// DATES ***********************************************************************************************************************************
D.extend(customParseFormat)

// STYLES **********************************************************************************************************************************
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SCHEMAS *********************************************************************************************************************************
export function rhfErrorsFromZod<TFieldValues extends FieldValues = FieldValues>(error: ZodError): FieldErrors<TFieldValues> {
  const {fieldErrors, formErrors} = error.flatten(({code: type, message}) => ({message, type}))
  return {
    root: formErrors[0],
    ...Object.fromEntries(Object.entries(fieldErrors).map(([name, errors]) => [name, errors?.[0]])),
  } as FieldErrors<TFieldValues>
}

// SERVICES ********************************************************************************************************************************

export function getServiceColor(slug?: Service["slug"]) {
  return isPrimaryService(slug) ? "primary" : "secondary"
}

export function getServicePrice(price: Service["price"]) {
  return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(price)
}

export function getServicesZcalUrl() {
  return `https://zcal.co/emb/theodosis?embed=1&embedType=iframe`
}

export function isPrimaryService(slug?: Service["slug"]) {
  return slug === "alchimie-cellulaire"
}
