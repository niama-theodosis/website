"use server"

import {resend} from "@/lib/resend"
import type {ActionState} from "@/lib/schemas"
import {rhfErrorsFromZod} from "@/lib/utils"
import {zServerData, type Data} from "./_utils"

// SEND EMAIL ******************************************************************************************************************************
export async function sendEmail(_prevState: ActionState<Data> | undefined, formData: FormData): Promise<ActionState<Data>> {
  try {
    const data = Object.fromEntries(formData.entries()) as Data
    const res = await zServerData.safeParseAsync(data)
    if (!res.success) return {status: 422, data, errors: rhfErrorsFromZod(res.error)}
    const {email, forename, message, surname} = res.data
    const {error} = await resend.emails.send({
      from: "contact@theodosis.fr",
      to: "niama.theodosis@gmail.com",
      subject: "Formulaire de contact",
      html: `<dl><dt>Nom :</dt><dd>${forename} ${surname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${message}</dd></dl>`,
    })
    // const error = undefined
    if (error) console.error(error)
    return {status: error ? 400 : 200}
  } catch (error_) {
    console.error(error_)
    return {status: 400}
  }
}
