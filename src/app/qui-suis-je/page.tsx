import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {StaticPageFragment} from "@/lib/hashnode/fragments"
import {graphql, readFragment} from "@/lib/hashnode/graphql"
import {notFound} from "next/navigation"

// GQL *************************************************************************************************************************************
const Query = graphql(
  `
    query PageByPublication($host: String!) {
      publication(host: $host) {
        staticPage(slug: "qui-suis-je") {
          ...StaticPage
        }
      }
    }
  `,
  [StaticPageFragment]
)

// MAIN ************************************************************************************************************************************
export default async function AboutPage() {
  const data = await hashnode.request(Query, {host: env.HASHNODE_PUBLICATION_HOST})
  if (!data.publication?.staticPage) notFound()
  const {content, title} = readFragment(StaticPageFragment, data.publication.staticPage)
  return (
    <article className="prose prose-headings:font-heading mx-auto max-w-screen-xl flex-1 py-16 px-8">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content.html}}></div>
    </article>
  )
}
