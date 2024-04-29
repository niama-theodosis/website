"use client"

import type {ActionStatus} from "@/lib/schemas"
import {useEffect, useState} from "react"
import {toast} from "sonner"
import {Alert, AlertDescription, AlertTitle} from "./ui/alert"

// ROOT ************************************************************************************************************************************
export function Notify({messages, status}: NotifyProps) {
  // const {reset} = useFormContext() // FIXME: warning in RHF
  const [noJs, setNoJs] = useState(true)

  useEffect(() => setNoJs(false), [])

  useEffect(() => {
    if (!status) return
    if (status === 200) {
      // reset() // FIXME: warning in RHF
      toast.success(messages[200])
    } else toast.error(messages[status ?? 400])
  }, [messages, status])

  if (!noJs || !status) return null
  return (
    <Alert variant={status === 200 ? "success" : "destructive"}>
      <AlertTitle>{status === 200 ? "Bravo !" : "Oups !"}</AlertTitle>
      <AlertDescription>{messages[status]}</AlertDescription>
    </Alert>
  )
}

// TYPES ***********************************************************************************************************************************
export type NotifyProps = {messages: Record<ActionStatus, string>; status?: ActionStatus}
