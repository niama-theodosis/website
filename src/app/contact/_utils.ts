// import {env} from "@/env"
import {z} from "zod"

// CONST ***********************************************************************************************************************************
// export const defaultData: Data = {captcha: "", email: "", forename: "", message: "", surname: ""}
export const defaultData: Data = {email: "", forename: "", message: "", surname: ""}

// SCHEMA **********************************************************************************************************************************
export const zData = z.object({
  // captcha: z.string(),
  email: z.string().trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
  forename: z.string().trim().min(1, "Ce champ est requis"),
  message: z.string().trim().min(1, "Ce champ est requis"),
  surname: z.string().trim().min(1, "Ce champ est requis"),
})

export const zServerData = z.object({
  ...zData.shape,
  // captcha: z.string().refine(
  //   async (captcha) => {
  //     const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  //       method: "POST",
  //       headers: {"content-type": "application/json"},
  //       body: JSON.stringify({response: captcha, secret: env.TURNSTILE_SECRET_KEY}),
  //     })
  //     const {success} = (await response.json()) as {success: boolean}
  //     return success
  //   },
  //   {message: "Le captcha n'est pas valide"}
  // ),
})

// TYPES ***********************************************************************************************************************************
export type Data = z.infer<typeof zData>
