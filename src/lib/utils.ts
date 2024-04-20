import {clsx, type ClassValue} from "clsx"
import type {FieldErrors, FieldValues} from "react-hook-form"
import {twMerge} from "tailwind-merge"
import type {ZodError} from "zod"

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
