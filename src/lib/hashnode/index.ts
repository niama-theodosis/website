import {env} from "@/env"
import {readFragment} from "gql.tada"
import {GraphQLClient} from "graphql-request"
import {StaticPageFragment} from "./fragments"
import {PageQuery} from "./queries"

// MIDDLEWARE ******************************************************************************************************************************
// const requestMiddleware: RequestMiddleware = (request) => {
//   if (request.operationName !== "Posts") return request
//   return {...request, body: (request.body as string).replace(`"variables":{`, `"variables":{"now":${Date.now()},`)}
// }

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT) //, { requestMiddleware})

// STATIC PAGE *****************************************************************************************************************************
export async function fetchPage(slug: string) {
  const data = await hashnode.request(PageQuery, {host: env.HASHNODE_PUBLICATION_HOST, slug})
  const page = readFragment(StaticPageFragment, data.publication?.staticPage)
  if (!page) return
  return {...page, image: page.ogMetaData?.image ?? undefined, title: page.title.split("|").at(-1)?.trim() ?? ""}
}
