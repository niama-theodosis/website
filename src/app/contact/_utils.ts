import {z} from "zod"

// CONST ***********************************************************************************************************************************
export const defaultData: Data = {email: "", forename: "", message: "", surname: ""}

// SCHEMA **********************************************************************************************************************************
export const zData = z.object({
  email: z.string().trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
  forename: z.string().trim().min(1, "Ce champ est requis"),
  message: z.string().trim().min(1, "Ce champ est requis"),
  surname: z.string().trim().min(1, "Ce champ est requis"),
})

// TYPES ***********************************************************************************************************************************
export type Data = z.infer<typeof zData>
