import {env} from "@/env"
import {GraphQLClient} from "graphql-request"

// CLIENT **********************************************************************************************************************************
export const hashnode = new GraphQLClient(env.HASHNODE_GQL_ENDPOINT)
