"use client"

import {Notify} from "@/components/notify"
import {Submit} from "@/components/submit"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import {useEffect} from "react"
import {useFormState} from "react-dom"
import {useForm} from "react-hook-form"
import {defaultData, zData, type Data} from "../_utils"
import {subscribeToNewsletter} from "../actions"

// CONST ***********************************************************************************************************************************
const messages = {
  200: "Veuillez valider votre inscription dans le courriel reçu.",
  400: "Veuillez réessayer ultérieurement.",
  409: "Vous êtes déjà inscrit·e.",
  422: "Veuillez corriger les erreurs ci-dessus.",
}

// ROOT ************************************************************************************************************************************
export default function NewsletterForm() {
  const [state, action] = useFormState(subscribeToNewsletter, undefined)

  const form = useForm<Data>({
    mode: "onTouched",
    resolver: zodResolver(zData),
    errors: state?.errors,
    defaultValues: state?.data ?? defaultData,
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    if ([200, 409].includes(state?.status ?? 400)) reset() // FIXME: warning in RHF
  }, [reset, state]) // FIXME: warning in RHF

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex flex-col gap-8">
        <FormField
          control={control}
          name="email"
          render={({field}) => (
            <FormItem>
              <div className="flex w-full items-center">
                <FormControl>
                  <div className="relative flex w-full items-center">
                    <span className="i-mdi-envelope absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Votre courriel..." {...field} className="rounded-r-none pl-9" />
                  </div>
                </FormControl>
                <Submit label="Je m'inscris" icon="i-mdi-register" className="rounded-l-none" />
              </div>
              <FormDescription>
                La protection de vos données est
                <Button asChild variant="link" className="h-auto px-1 py-0">
                  <Link href="/mentions-legales">notre priorité.</Link>
                </Button>
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Notify messages={messages} state={state} />
      </form>
    </Form>
  )
}
