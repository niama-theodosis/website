import {WebhookError, validateWebhook, zWebhook} from "@/lib/hashnode/utils"
import {revalidateTag} from "next/cache"

// POST ************************************************************************************************************************************
export async function POST(request: Request) {
  try {
    const payload = await request.json()
    validateWebhook(request.headers.get("x-hashnode-signature"), payload)
    const {id, type} = zWebhook.parse(payload)
    if (type === "post") {
      revalidateTag("posts")
      revalidateTag(id)
    }
    return new Response(JSON.stringify("ok"), {status: 200})
  } catch (error_) {
    console.error(error_)
    if (error_ instanceof WebhookError) return new Response("unauthorized", {status: 401})
    return new Response(JSON.stringify("error"), {status: 500})
  }
}
