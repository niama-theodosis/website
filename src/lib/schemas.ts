import {contacts, images, services} from "@/server/db/schema"
import {createSelectSchema} from "drizzle-zod"
import {z} from "zod"

// IMAGES **********************************************************************************************************************************
export const zImageDto = createSelectSchema(images)

export type ImageDto = z.infer<typeof zImageDto>

// CONTACTS ********************************************************************************************************************************
export const zContactDto = createSelectSchema(contacts)
export const zContact = z.object({...zContactDto.shape, logo: zImageDto.nullish()})

export type ContactDto = z.infer<typeof zContactDto>
export type Contact = z.infer<typeof zContact>

// SERVICES ********************************************************************************************************************************
export const zServiceDto = createSelectSchema(services)

export const zService = z.object({...zServiceDto.shape, image: zImageDto}).transform((data) => {
  const uri = `/prestations/${data.slug}`
  const meetingUri = `/rendez-vous/${data.slug}`
  const zcalUrl = `https://zcal.co/i/${data.zcal}?embed=1&embedType=iframe`
  return {...data, meetingUri, uri, zcalUrl}
})

export type ServiceDto = z.infer<typeof zServiceDto>
export type Service = z.infer<typeof zService>
