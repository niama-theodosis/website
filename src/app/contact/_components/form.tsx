"use client"

import {Notify} from "@/components/notify"
import {Submit} from "@/components/submit"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
// import {env} from "@/env"
import {zodResolver} from "@hookform/resolvers/zod"
// import {Turnstile} from "@marsidev/react-turnstile"
import {useEffect} from "react"
import {useFormState} from "react-dom"
import {useForm} from "react-hook-form"
import {defaultData, zData, type Data} from "../_utils"
import {sendEmail} from "../actions"

// CONSTS **********************************************************************************************************************************
const messages = {
  200: "Votre message a été envoyé avec succès",
  400: "Une erreur est survenue",
  422: "Veuillez corriger les erreurs ci-dessus",
}

// ROOT ************************************************************************************************************************************
export default function ContactForm() {
  const [state, action] = useFormState(sendEmail, undefined)

  const form = useForm<Data>({
    mode: "onTouched",
    resolver: zodResolver(zData),
    errors: state?.errors,
    defaultValues: state?.data ?? defaultData,
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    if (state?.status === 200) reset() // FIXME: warning in RHF
  }, [reset, state]) // FIXME: warning in RHF

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => true)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <FormField
            control={control}
            name="forename"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom..." {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="surname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom..." {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </div>
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
        <FormField
          control={control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel>Votre message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message..." {...field} rows={8} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        {/* <Turnstile siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} options={{responseFieldName: "captcha", size: "invisible"}} /> */}
        <Notify messages={messages} state={state} />
        <Submit label="Envoyer" icon="i-lucide-send" className="self-end text-base" />
      </form>
    </Form>
  )
}
