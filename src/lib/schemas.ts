import {contacts, images, services} from "@/lib/db/schema"
import {createSelectSchema} from "drizzle-zod"
import type {FieldErrors, FieldValues} from "react-hook-form"
import {z} from "zod"

// IMAGES **********************************************************************************************************************************
export const zImageDto = createSelectSchema(images)

// CONTACTS ********************************************************************************************************************************
export const zContactDto = createSelectSchema(contacts)
export const zContact = z.object({...zContactDto.shape, logo: zImageDto.nullish()})

// SERVICES ********************************************************************************************************************************
export const PAYMENTS = ["cash", "check", "creditCard"] as const
export const zPayment = z.enum(PAYMENTS)

export const PLACES = ["faceToFace", "remotely"] as const
export const zPlace = z.enum(PLACES)

export const zServiceDto = createSelectSchema(services)

export const zService = z.object({...zServiceDto.shape, image: zImageDto}).transform((data) => {
  const uri = `/prestations/${data.slug}`
  const zcalUrl = `https://zcal.co/i/${data.zcal}?embed=1&embedType=iframe`
  const payments = zPayment.array().parse(data.payments) // FIXME: bug in drizzle-zod
  const places = zPlace.array().parse(data.places) // FIXME: bug in drizzle-zod
  return {...data, payments, places, uri, zcalUrl}
})

// TYPES ***********************************************************************************************************************************
export type Contact = z.infer<typeof zContact>
export type ContactDto = z.infer<typeof zContactDto>
export type ImageDto = z.infer<typeof zImageDto>
export type Service = z.infer<typeof zService>
export type ServiceDto = z.infer<typeof zServiceDto>

export type ActionState<D extends FieldValues = FieldValues> = {
  data?: D
  errors?: FieldErrors<D>
  status: ActionStatus
}

export type ActionStatus = 200 | 400 | 409 | 422
