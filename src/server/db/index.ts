import {sql} from "@vercel/postgres"
import {drizzle} from "drizzle-orm/vercel-postgres"
import {cache} from "react"
import {zContact, zService} from "~/lib/schemas"
import * as schema from "./schema"

// CLIENT **********************************************************************************************************************************
export const db = drizzle(sql, {schema})

// CONTACT *********************************************************************************************************************************
export const fetchContact = cache(async () => {
  const contactDto = await db.query.contacts.findFirst({with: {logo: true}})
  return zContact.parse(contactDto)
})

// SERVICES ********************************************************************************************************************************
export const fetchServices = cache(async () => {
  const serviceDtos = await db.query.services.findMany({with: {image: true}})
  return zService.array().parse(serviceDtos)
})

export const fetchService = cache(async (slug: string) => {
  const serviceDto = await db.query.services.findFirst({with: {image: true}, where: (service, {eq}) => eq(service.slug, slug)})
  return zService.optional().parse(serviceDto)
})
