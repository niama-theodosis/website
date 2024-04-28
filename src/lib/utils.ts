import {clsx, type ClassValue} from "clsx"
import D from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import type {FieldErrors, FieldValues} from "react-hook-form"
import {twMerge} from "tailwind-merge"
import type {ZodError} from "zod"

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
export function isPrimaryService(serviceSlug?: string) {
  return serviceSlug === "alchimie-cellulaire"
}

export function getServiceVariant(serviceSlug?: string) {
  return isPrimaryService(serviceSlug) ? "primary" : "secondary"
}

export function getServiceDuration(duration: string) {
  return D(duration, "HH:mm:ss").format("H[h]mm")
}

export function getServicePrice(price: number) {
  return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(price)
}

