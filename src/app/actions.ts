"use server"

import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {graphql} from "@/lib/hashnode/graphql"
import type {ActionState} from "@/lib/schemas"
import {rhfErrorsFromZod} from "@/lib/utils"
import {ClientError} from "node_modules/graphql-request/build/esm/types"
import {zData, type Data} from "./_utils"

// GQL *************************************************************************************************************************************
const Mutation = graphql(`
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`)

// SUBSCRIBE TO NEWSLETTER *****************************************************************************************************************
export async function subscribeToNewsletter(_prevState: ActionState<Data> | undefined, formData: FormData): Promise<ActionState<Data>> {
  try {
    const data = Object.fromEntries(formData.entries()) as Data
    const res = zData.safeParse(data)
    if (!res.success) return {status: 422, data, errors: rhfErrorsFromZod(res.error)}
    const {email} = res.data
    await hashnode.request(Mutation, {input: {email, publicationId: env.HASHNODE_PUBLICATION_ID}})
    return {status: 200}
  } catch (error_) {
    if (error_ instanceof ClientError && error_.response?.errors?.[0]?.extensions.code === "BAD_USER_INPUT") return {status: 409}
    return {status: 400}
  }
}
