import PostCard, {PostCardFragment, PostNone, PostSkeleton, type PostCardData} from "@/components/post-card"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {PageInfoFragment} from "@/lib/hashnode/fragments"
import {graphql} from "@/lib/hashnode/graphql"
import {print} from "graphql"
import {Suspense, forwardRef} from "react"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle, type SectionProps} from "./ui/section"

// GQL *************************************************************************************************************************************
const PostsQuery = graphql(
  `
    query Posts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
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
      }
    }
  `,
  [PageInfoFragment, PostCardFragment]
)

const PostsByTagQuery = graphql(
  `
    query PostsByTag($host: String!, $first: Int!, $tag: String!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after, filter: {tagSlugs: [$tag]}) {
          edges {
            node {
              ...PostCard
            }
          }
          pageInfo {
            ...PageInfo
          }
        }
      }
    }
  `,
  [PageInfoFragment, PostCardFragment]
)

// const fetchPosts = async ({after, first, tag}: Pick<PostsSectionProps, "after" | "first" | "tag">) => {
//   unstable_noStore()
//   const data = await (tag
//     ? hashnode.request(PostsByTagQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, tag})
//     : hashnode.request(PostsQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first}))
//   return data.publication?.posts.edges ?? []
// }

const fetchPosts = async ({after, first, tag}: Pick<PostsSectionProps, "after" | "first" | "tag">) => {
  const data = await (tag
    ? hashnode.request(PostsByTagQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, tag})
    : fetch(env.HASHNODE_GQL_ENDPOINT, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          query: print(PostsQuery),
          variables: {host: env.HASHNODE_PUBLICATION_HOST, after, first},
        }),
        next: {tags: ["posts"]},
      })
        .then((res) => res.json() as unknown as {data: {publication: {posts: {edges: {node: PostCardData}[]}}}})
        .then((res) => res.data))
  return data.publication?.posts.edges ?? []
}

// ROOT ************************************************************************************************************************************
export const PostsSection = forwardRef<HTMLElement, PostsSectionProps>(async ({after, first, tag, tagline, title, ...props}, ref) => {
  return (
    <Section ref={ref} {...props}>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{tagline}</SectionTagline>
          </SectionHeader>
          <div className="mx-auto grid w-full max-w-screen-xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<Loading count={first} />}>
              <Posts after={after} first={first} tag={tag} />
            </Suspense>
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
})
PostsSection.displayName = "PostsSection"

// ITEMS ***********************************************************************************************************************************
async function Posts(props: Pick<PostsSectionProps, "after" | "first" | "tag">) {
  const posts = await fetchPosts(props)

  if (posts.length === 0) return <PostNone />
  return (
    <>
      {posts.map(({node: data}, i) => (
        <PostCard key={i} data={data} />
      ))}
    </>
  )
}

// LOADING *********************************************************************************************************************************
function Loading({count}: {count: number}) {
  return (
    <>
      {Array.from(Array(count).keys()).map((index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  )
}

// TYPES ************************************************************************************************************************************
export type PostsSectionProps = SectionProps & {after?: string; first: number; tag?: string; tagline: string; title: string}
