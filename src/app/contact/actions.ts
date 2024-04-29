"use server"

import type {ActionState} from "@/lib/schemas"
import {rhfErrorsFromZod} from "@/lib/utils"
import {zData, type Data} from "./_utils"

// SEND EMAIL ******************************************************************************************************************************
export async function sendEmail(_prevState: ActionState<Data> | undefined, formData: FormData): Promise<ActionState<Data>> {
  try {
    // await new Promise((r) => setTimeout(r, 2000))
    const data = Object.fromEntries(formData.entries()) as Data
    const res = zData.safeParse(data)
    if (!res.success) return {status: 422, data, errors: rhfErrorsFromZod(res.error)}
    const {email, forename, message, surname} = res.data
    //TODO: IMPLEMENT EMAIL SENDING WITH RESEND
    // await sendEmail({
    //   sender: {name: 'Grégory Bouteiller', email: 'gregory.bouteiller@gmail.com'},
    //   to: [{name: 'Grégory Bouteiller', email: 'gregory.bouteiller@googlemail.com'}],
    //   subject: 'Formulaire de contact',
    //   htmlContent: `<dl><dt>Nom :</dt><dd>${forename} ${surname}</dd><dt>Courriel :</dt><dd>${email}</dd><dt>Message :</dt><dd>${message}</dd></dl>`,
    // });
    return {status: 200}
  } catch (error_) {
    console.error(error_)
    return {status: 400}
  }
}

