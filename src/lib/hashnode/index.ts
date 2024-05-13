import {PostCardFragment} from "@/components/post-card"
import {env} from "@/env"
import {GraphQLClient} from "graphql-request"
import {unstable_cache} from "next/cache"
import {PageInfoFragment, StaticPageFragment} from "./fragments"
import {graphql, readFragment} from "./graphql"

// MIDDLEWARE ******************************************************************************************************************************
// const requestMiddleware: RequestMiddleware = (request) => {
//   if (request.operationName !== "Posts") return request
//   return {...request, body: (request.body as string).replace(`"variables":{`, `"variables":{"now":${Date.now()},`)}
// }

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT) //, { requestMiddleware})

// STATIC PAGE *****************************************************************************************************************************
export const PageQuery = graphql(
  `
    query Page($host: String!, $slug: String!) {
      publication(host: $host) {
        staticPage(slug: $slug) {
          ...StaticPage
        }
      }
    }
  `,
  [StaticPageFragment]
)

export async function fetchPage(slug: string) {
  const data = await hashnode.request(PageQuery, {host: env.HASHNODE_PUBLICATION_HOST, slug})
  const page = readFragment(StaticPageFragment, data.publication?.staticPage)
  if (!page) return
  return {...page, image: page.ogMetaData?.image ?? undefined, title: page.title.split("|").at(-1)?.trim() ?? ""}
}

// POSTS ***********************************************************************************************************************************
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
export const fetchPosts = unstable_cache(
  async (first: number, after?: string) => {
    const data = await hashnode.request(PostsQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, now: Date.now()})
    return data.publication?.posts.edges ?? []
  },
  undefined,
  {tags: ["posts"]}
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
export const fetchPostsByTag = async (tag: string, first: number, after?: string) => {
  const data = await hashnode.request(PostsByTagQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, tag})
  return data.publication?.posts.edges ?? []
}
