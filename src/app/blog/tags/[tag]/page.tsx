import PostCard, {PostCardFragment} from "@/components/post-card"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {PageInfoFragment, PublicationFragment} from "@/lib/hashnode/fragments"
import {graphql} from "@/lib/hashnode/graphql"
import {notFound} from "next/navigation"

// GQL *************************************************************************************************************************************
const PostsByTagQuery = graphql(
  `
    query PostsByTag($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        ...Publication
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
  [PageInfoFragment, PostCardFragment, PublicationFragment]
)

// MAIN ************************************************************************************************************************************
export default async function BlogTagPage({params: {tag}}: Props) {
  if (!tag) return notFound()

  const data = await hashnode.request(PostsByTagQuery, {first: 20, host: env.HASHNODE_PUBLICATION_HOST})
  const posts = data.publication?.posts.edges ?? []

  return (
    <>
      <div className="flex pt-3">
        <p className="mr-1 px-1 pt-1 text-lg">{posts.length} post(s) matched the tag</p>
        {/* <Taged data={matchedTag} />  */}
        <span className="mx-3 mt-1 block text-xl font-bold text-slate-500"> | </span>
        <a className="mt-1.5" href={`/blog`}>
          See all posts
        </a>
      </div>
      {posts.map(({node: data}, i) => (
        <PostCard key={i} data={data} />
      ))}
    </>
  )
}

// TYPES ***********************************************************************************************************************************
type Props = {
  params: {tag: string}
}
