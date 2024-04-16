import slugify from "@sindresorhus/slugify"
import {createSelectSchema} from "drizzle-zod"
import {z} from "zod"
import {images, services} from "~/server/db/schema"

// IMAGES **********************************************************************************************************************************
export const zImageDto = createSelectSchema(images)

export type ImageDto = z.infer<typeof zImageDto>

// SERVICES ********************************************************************************************************************************
export const zServiceDto = createSelectSchema(services)

export const zService = z.object({...zServiceDto.shape, image: zImageDto }).transform((data) => {
  const slug = slugify(data.name)
  const uri = `/services/${slug}`
  return {...data, slug, uri}
})

export type ServiceDto = z.infer<typeof zServiceDto>
export type Service = z.infer<typeof zService>