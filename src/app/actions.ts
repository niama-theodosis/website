"use server"

import type {ActionState} from "@/lib/schemas"
import {rhfErrorsFromZod} from "@/lib/utils"
import {zData, type Data} from "./_utils"

// SUBSCRIBE TO NEWSLETTER *****************************************************************************************************************
export async function subscribeToNewsletter(_prevState: ActionState<Data> | undefined, formData: FormData): Promise<ActionState<Data>> {
  try {
    await new Promise((r) => setTimeout(r, 2000))
    const data = Object.fromEntries(formData.entries()) as Data
    const res = zData.safeParse(data)
    if (!res.success) return {status: 422, data, errors: rhfErrorsFromZod(res.error)}
    const {email} = res.data
    //TODO: IMPLEMENT HASHNODE SUBSCRIPTION
    return {status: 200}
  } catch (error_) {
    console.error(error_)
    return {status: 400}
  }
}
