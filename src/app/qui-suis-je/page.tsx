import {fetchPage} from "@/lib/pocketbase"
import {notFound} from "next/navigation"

// ROOT ************************************************************************************************************************************
export default async function AboutPage() {
  const data = await fetchPage("qui-suis-je")
  if (!data) notFound()
  const {content, title} = data
  return (
    <article className="prose mx-auto max-w-screen-xl flex-1 px-8 py-16 prose-headings:font-heading">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </article>
  )
}
