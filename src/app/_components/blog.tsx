import PostCard, {PostCardFragment} from "@/components/post-card"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Section, SectionContent, SectionHeader, SectionTagline, SectionTitle} from "@/components/ui/section"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {graphql} from "@/lib/hashnode/graphql"

// GQL *************************************************************************************************************************************
export const Query = graphql(
  `
    query PostsByPublication($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              ...PostCard
            }
          }
        }
      }
    }
  `,
  [PostCardFragment]
)

// MAIN ************************************************************************************************************************************
export default async function HomeBlog() {
  const data = await hashnode.request(Query, {host: env.HASHNODE_PUBLICATION_HOST, first: 3})
  const posts = data.publication?.posts.edges ?? []

  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionHeader>
          <SectionTitle>Mes derniers articles</SectionTitle>
          <SectionTagline>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </SectionTagline>
        </SectionHeader>
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(({node: data}, i) => (
              <PostCard key={i} data={data} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Alert className="w-auto">
              <AlertTitle>Revenez prochainement!</AlertTitle>
              <AlertDescription>Il n&apos;y a actuellement encore aucun article.</AlertDescription>
            </Alert>
          </div>
        )}
      </SectionContent>
    </Section>
  )
}
