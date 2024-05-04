import PostCard, {PostCardFragment, PostSkeleton} from "@/components/post-card"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {graphql} from "@/lib/hashnode/graphql"
import {Suspense} from "react"

// GQL *************************************************************************************************************************************
const LastPostsQuery = graphql(
  `
    query LastPosts($host: String!, $first: Int!, $after: String) {
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

const fetchLastPosts = async () => {
  const data = await hashnode.request(LastPostsQuery, {host: env.HASHNODE_PUBLICATION_HOST, first: 3})
  return data.publication?.posts.edges ?? []
}

// ROOT ************************************************************************************************************************************
export default async function HomeBlog() {
  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>Mes derniers articles</SectionTitle>
            <SectionTagline>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </SectionTagline>
          </SectionHeader>
          <Suspense fallback={<Loading />}>
            <Posts />
          </Suspense>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}

// POSTS ************************************************************************************************************************************
async function Posts() {
  const posts = await fetchLastPosts()
  if (posts.length === 0) return <None />
  return (
    <div className="mx-auto grid max-w-screen-xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(({node: data}, i) => (
        <PostCard key={i} data={data} />
      ))}
    </div>
  )
}

// LOADING *********************************************************************************************************************************
function Loading() {
  return (
    <div className="mx-auto w-full grid max-w-screen-xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  )
}

// NONE ************************************************************************************************************************************
function None() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Alert className="w-auto">
        <AlertTitle>Revenez prochainement!</AlertTitle>
        <AlertDescription>Il n&apos;y a actuellement encore aucun article.</AlertDescription>
      </Alert>
    </div>
  )
}
