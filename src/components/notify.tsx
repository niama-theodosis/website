"use client"

import type {ActionState, ActionStatus} from "@/lib/schemas"
import {useEffect, useState} from "react"
import {toast} from "sonner"
import {Alert, AlertDescription, AlertTitle} from "./ui/alert"

// ROOT ************************************************************************************************************************************
export function Notify({messages, state}: NotifyProps) {
  // const {reset} = useFormContext() // FIXME: warning in RHF
  const [noJs, setNoJs] = useState(true)

  useEffect(() => setNoJs(false), [])

  useEffect(() => {
    if (!state?.status) return
    if (state?.status === 200) {
      // reset() // FIXME: warning in RHF
      toast.success(messages[200])
    } else toast.error(messages[state?.status ?? 400])
  }, [messages, state])

  if (!noJs || !state?.status) return null
  return (
    <Alert variant={state?.status === 200 ? "success" : "destructive"}>
      <AlertTitle>{state?.status === 200 ? "Bravo !" : "Oups !"}</AlertTitle>
      <AlertDescription>{messages[state?.status]}</AlertDescription>
    </Alert>
  )
}

// TYPES ***********************************************************************************************************************************
export type NotifyProps = {messages: Record<ActionStatus, string>; state?: ActionState}
