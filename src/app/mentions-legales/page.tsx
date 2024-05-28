import {fetchPage} from "@/lib/pocketbase"
import {notFound} from "next/navigation"

// CACHE ***********************************************************************************************************************************
export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export default async function DisclaimerPage() {
  const data = await fetchPage("mentions-legales")
  if (!data) notFound()
  const {content, title} = data

  return (
    <article className="prose mx-auto max-w-screen-xl flex-1 px-8 py-16 prose-headings:font-heading">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </article>
  )
}
