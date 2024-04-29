import {z} from "zod"

// CONST ***********************************************************************************************************************************
export const defaultData: Data = {email: ""}

// SCHEMA **********************************************************************************************************************************
export const zData = z.object({
  email: z.string().trim().min(1, "Ce champ est requis").email("Ce courriel est invalide"),
})

// TYPES ***********************************************************************************************************************************
export type Data = z.infer<typeof zData>
