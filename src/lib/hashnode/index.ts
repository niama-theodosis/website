import {env} from "@/env"
import {GraphQLClient} from "graphql-request"

// MIDDLEWARE ******************************************************************************************************************************
// const requestMiddleware: RequestMiddleware = (request) => {
//   if (request.operationName !== "Posts") return request
//   return {...request, body: (request.body as string).replace(`"variables":{`, `"variables":{"now":${Date.now()},`)}
// }

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT)//, { requestMiddleware})
