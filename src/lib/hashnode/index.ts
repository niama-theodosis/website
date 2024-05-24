import {PostCardFragment} from "@/components/post-card"
import {env} from "@/env"
import {GraphQLClient} from "graphql-request"
import {unstable_cache} from "next/cache"
import {PageInfoFragment, StaticPageFragment} from "./fragments"
import {graphql, readFragment} from "./graphql"

// CONSTS **********************************************************************************************************************************
const pageIdsFromSlugs = new Map(
  Object.entries({
    "accueil-derniers-articles": "663db70d7aa2212ac4986d63",
    "accueil-mes-prestations": "663db4057aa2212ac4984a48",
    "accueil-newsletter": "663db7dc7aa2212ac49876c9",
    "accueil-que-sont-les-memoires-cellulaires": "663d9bc48382504f7dbed972",
    "accueil-qui-suis-je": "663db5568382504f7dbfbeb2",
    "mentions-legales": "662ef19f30461289239ca56d",
    "prestations-alchimie-cellulaire-bienfaits": "662cf74c3329d84a2795f0c5",
    "prestations-alchimie-cellulaire-deroulement": "662cf617f7bb04a3d7ded9d5",
    "prestations-alchimie-cellulaire-introduction": "662cf7e77b81aad77b4e15ad",
    "prestations-alchimie-cellulaire-raisons": "662cf5102730acfeb7098d40",
    "prestations-chargement-des-meridiens-bienfaits": "662e49849e29867a291310ec",
    "prestations-chargement-des-meridiens-deroulement": "662e49d90f9ca52fe9c5856b",
    "prestations-chargement-des-meridiens-introduction": "662e4a19f594e3cd811b7a73",
    "prestations-chargement-des-meridiens-raisons": "662e4a49c119828182cfb971",
    "prestations-harmonisation-energetique-bienfaits": "662eeb9d62adeb20a55d15fc",
    "prestations-harmonisation-energetique-deroulement": "662eec888787b699266e172e",
    "prestations-harmonisation-energetique-introduction": "662eece640846e648fe3e730",
    "prestations-harmonisation-energetique-raisons": "662eed6e9702578185f8e02d",
    "prestations-liberation-des-emotions-bienfaits": "662e573acf340848e036ca7d",
    "prestations-liberation-des-emotions-deroulement": "662ee8d01ec88281b0ae1591",
    "prestations-liberation-des-emotions-introduction": "662ee9609f27293c1b3a6a12",
    "prestations-liberation-des-emotions-raisons": "662ee9b9c9f771698854ac14",
    "qui-suis-je": "662721820d87b50decbc9219",
  })
)

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT)

// STATIC PAGE *****************************************************************************************************************************
const PageQuery = graphql(
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

export const fetchPage = (slug: string) =>
  unstable_cache(
    async () => {
      const data = await hashnode.request(PageQuery, {host: env.HASHNODE_PUBLICATION_HOST, slug})
      const page = readFragment(StaticPageFragment, data.publication?.staticPage)
      if (!page) return
      return {...page, image: page.ogMetaData?.image ?? undefined, title: page.title.split("|").at(-1)?.trim() ?? ""}
    },
    undefined,
    {tags: [`page-${pageIdsFromSlugs.get(slug)}`]}
  )()

// SERVICE *********************************************************************************************************************************
const ServiceSectionsQuery = graphql(
  `
    query ServiceSections($host: String!, $benefits: String!, $intro: String!, $proceedings: String!, $reasons: String!) {
      publication(host: $host) {
        benefits: staticPage(slug: $benefits) {
          ...StaticPage
        }
        intro: staticPage(slug: $intro) {
          ...StaticPage
        }
        proceedings: staticPage(slug: $proceedings) {
          ...StaticPage
        }
        reasons: staticPage(slug: $reasons) {
          ...StaticPage
        }
      }
    }
  `,
  [StaticPageFragment]
)

export const fetchService = async (slug: string) => {
  const {publication} = await hashnode.request(ServiceSectionsQuery, {
    host: env.HASHNODE_PUBLICATION_HOST,
    benefits: `prestations-${slug}-bienfaits`,
    intro: `prestations-${slug}-introduction`,
    proceedings: `prestations-${slug}-deroulement`,
    reasons: `prestations-${slug}-raisons`,
  })

  if (!publication?.benefits || !publication?.intro || !publication?.proceedings || !publication?.reasons) return

  const benefits = readFragment(StaticPageFragment, publication.benefits)
  const intro = readFragment(StaticPageFragment, publication.intro)
  const proceedings = readFragment(StaticPageFragment, publication.proceedings)
  const reasons = readFragment(StaticPageFragment, publication.reasons)
  return {benefits, intro, proceedings, reasons}
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
export const fetchPostsByTag = unstable_cache(
  async (tag: string, first: number, after?: string) => {
    const data = await hashnode.request(PostsByTagQuery, {host: env.HASHNODE_PUBLICATION_HOST, after, first, tag})
    return data.publication?.posts.edges ?? []
  },
  undefined,
  {tags: ["posts"]}
)
