import {StaticPageFragment} from "./fragments"
import {graphql} from "./graphql"

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
