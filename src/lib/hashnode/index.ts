import {PostCardFragment} from "@/components/post-card"
import {env} from "@/env"
import {GraphQLClient} from "graphql-request"
import {unstable_cache} from "next/cache"
import {PageInfoFragment} from "./fragments"
import {graphql} from "./graphql"

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT)

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
export const fetchPostsByTag = unstable_cache(
  async (tag: string, first: number, after?: string) => {
    const data = await hashnode.request(PostsByTagQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, tag})
    return data.publication?.posts.edges ?? []
  },
  undefined,
  {tags: ["posts"]}
)
