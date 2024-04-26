import PostCard, {PostCardFragment} from "@/components/post-card"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {PageInfoFragment} from "@/lib/hashnode/fragments"
import {graphql} from "@/lib/hashnode/graphql"

// GQL *************************************************************************************************************************************
const Query = graphql(
  `
    query PostsByPublication($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        about {
          text
        }
        displayTitle
        posts(first: $first, after: $after) {
          edges {
            node {
              ...PostCard
            }
          }
          pageInfo {
            ...PageInfo
          }
        }
        title
      }
    }
  `,
  [PageInfoFragment, PostCardFragment]
)

// MAIN ************************************************************************************************************************************
export default async function BlogPage() {
  const data = await hashnode.request(Query, {host: env.HASHNODE_PUBLICATION_HOST, first: 20})
  const title = data.publication?.displayTitle ?? data.publication?.title ?? "Blog"
  const tagline = data.publication?.about?.text ?? "Découvrez nos articles"
  const posts = data.publication?.posts.edges ?? []

  return (
    <Section className="flex-1">
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{tagline}</SectionTagline>
          </SectionHeader>
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(({node: data}, i) => (
                <PostCard key={i} data={data} />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Alert>
                <AlertTitle>Revenez prochainement!</AlertTitle>
                <AlertDescription>Il n&apos;y a actuellement encore aucun article.</AlertDescription>
              </Alert>
            </div>
          )}
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
