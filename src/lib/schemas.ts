import type {FieldErrors, FieldValues} from "react-hook-form"

// TYPES ***********************************************************************************************************************************
export type ActionState<D extends FieldValues = FieldValues> = {
  data?: D
  errors?: FieldErrors<D>
  status: ActionStatus
}

export type ActionStatus = 200 | 400 | 409 | 422
