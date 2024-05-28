import {env} from "@/env"
import {unstable_cache} from "next/cache"
import PocketBase from "pocketbase"
import {cache} from "react"
import {zContactRecord, zHome, zPageRecord, zService, zServiceRecord} from "./schemas"

// INIT ************************************************************************************************************************************
const SINGLETON = "fedcba987654321"
export const pb = new PocketBase(env.POCKETBASE_URL)
pb.autoCancellation(false)

// CONTACT *********************************************************************************************************************************
export const fetchContact = unstable_cache(
  async () => {
    const record = await pb.collection("contact").getOne(SINGLETON)
    return zContactRecord.parse(record)
  },
  undefined,
  {tags: ["contact"]}
)

// HOME ************************************************************************************************************************************
export const fetchHome = unstable_cache(
  async () => {
    const record = await pb.collection("home").getOne(SINGLETON, {expand: "about_image,hero_image"})
    return zHome.parse(record)
  },
  undefined,
  {tags: ["home"]}
)

// PAGES ***********************************************************************************************************************************
export const fetchPage = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const record = await pb.collection("pages").getFirstListItem(`slug="${slug}"`)
        return zPageRecord.parse(record)
      } catch {}
    },
    undefined,
    {tags: [`pages_${slug}`]}
  )()

// SERVICES ********************************************************************************************************************************
export const fetchService = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        const record = await pb.collection("services").getFirstListItem(`slug="${slug}"`, {expand: "image"})
        return zService.parse(record)
      } catch {}
    },
    undefined,
    {tags: [`services_${slug}`]}
  )()

export const fetchServices = unstable_cache(
  async () => {
    const records = await pb.collection("services").getFullList({expand: "image", sort: "+name"})
    return zService.array().parse(records)
  },
  undefined,
  {tags: ["services"]}
)

export const fetchOtherServices = unstable_cache(
  async (slug: string) => {
    const records = await pb.collection("services").getFullList({expand: "image", filter: `slug!="${slug}"`, sort: "+name"})
    return zService.array().parse(records)
  },
  undefined,
  {tags: ["services"]}
)

export const fetchServiceSlugs = cache(async () => {
  const records = await pb.collection("services").getFullList({fields: "slug"})
  return zServiceRecord.pick({slug: true}).array().parse(records)
})
