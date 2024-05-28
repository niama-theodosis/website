import {revalidateTag} from "next/cache"
import {z} from "zod"

// POST ************************************************************************************************************************************
export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const {tags} = z.object({tags: z.string().array()}).parse(payload)
    tags.forEach((tag) => revalidateTag(tag))
    return new Response(JSON.stringify("ok"), {status: 200})
  } catch (error_) {
    console.error(error_)
    return new Response(JSON.stringify("error"), {status: 500})
  }
}
