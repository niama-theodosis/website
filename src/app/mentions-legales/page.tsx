import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {StaticPageFragment} from "@/lib/hashnode/fragments"
import {graphql, readFragment} from "@/lib/hashnode/graphql"
import {notFound} from "next/navigation"

// GQL *************************************************************************************************************************************
const PageDisclaimerQuery = graphql(
  `
    query PageDisclaimer($host: String!) {
      publication(host: $host) {
        staticPage(slug: "mentions-legales") {
          ...StaticPage
        }
      }
    }
  `,
  [StaticPageFragment]
)

// ROOT ************************************************************************************************************************************
export default async function DisclaimerPage() {
  const data = await hashnode.request(PageDisclaimerQuery, {host: env.HASHNODE_PUBLICATION_HOST})
  if (!data.publication?.staticPage) notFound()
  const {content, title} = readFragment(StaticPageFragment, data.publication.staticPage)
  return (
    <article className="prose mx-auto max-w-screen-xl flex-1 px-8 py-16 prose-headings:font-heading">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content.html}}></div>
    </article>
  )
}
