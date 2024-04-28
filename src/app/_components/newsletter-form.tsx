"use client"

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"
import {zodResolver} from "@hookform/resolvers/zod"
import {useEffect, useState} from "react"
import {useFormState, useFormStatus} from "react-dom"
import {useForm, useFormContext} from "react-hook-form"
import {toast} from "sonner"

// ROOT ************************************************************************************************************************************
export default function NewsletterForm() {
  const [state, action] = useFormState(sendEmail, undefined)

  const form = useForm<Data>({
    mode: "onTouched",
    resolver: zodResolver(zData),
    errors: state?.errors,
    defaultValues: state?.data ?? defaultData,
  })
  const {control, formState, handleSubmit} = form

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex flex-col gap-8">
        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Votre courriel</FormLabel>
              <FormControl>
                <Input placeholder="Votre courriel..." {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Notify status={state?.status} />
        <Submit />
      </form>
    </Form>
  )
}

// SUBMIT **********************************************************************************************************************************
export function Submit() {
  const {pending} = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="flex gap-2 self-end text-base">
      <span className={cn("h-4 w-4", pending ? "i-lucide-loader animate-spin" : "i-lucide-send")}></span>
      <span>Envoyer</span>
    </Button>
  )
}

// NOTIFY **********************************************************************************************************************************
const messages = {
  200: "Votre message a été envoyé avec succès",
  400: "Une erreur est survenue",
  422: "Veuillez corriger les erreurs ci-dessus",
}

export function Notify({status}: {status?: State["status"]}) {
  const {reset} = useFormContext()
  const [noJs, setNoJs] = useState(true)

  useEffect(() => setNoJs(false), [])

  useEffect(() => {
    if (status === 200) {
      reset()
      toast.success(messages[200])
    } else toast.error(messages[status ?? 400])
  }, [reset, status])

  if (noJs || !status) return null
  return (
    <Alert variant={status === 200 ? "success" : "destructive"}>
      <AlertTitle>{status === 200 ? "Bravo !" : "Oups !"}</AlertTitle>
      <AlertDescription>{messages[status]}</AlertDescription>
    </Alert>
  )
}


