import {fetchPage} from "@/lib/hashnode"
import {notFound} from "next/navigation"

// ROOT ************************************************************************************************************************************
export default async function AboutPage() {
  const data = await fetchPage("qui-suis-je")
  if (!data) notFound()
  const {content, title} = data
  return (
    <article className="prose prose-headings:font-heading mx-auto max-w-screen-xl flex-1 py-16 px-8">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content.html}}></div>
    </article>
  )
}
