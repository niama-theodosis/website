import {notFound} from "next/navigation"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion"
import type {Service} from "~/lib/schemas"
import {fetchService} from "~/server/db"

// MAIN ************************************************************************************************************************************
export default async function ServicesItemPage({params: {slug}}: ServicesItemPageProps) {
  const item = await fetchService(slug)
  if (!item) notFound()
  // const {services} = item

  return (
    <main className="flex flex-1 flex-col items-center justify-between p-24">
      {/* {services.map((service) => (
        <Item key={service.id} service={service} />
        // <div key={id}>
        //   <h3>Présentation</h3>
        //   <article dangerouslySetInnerHTML={{__html: content}}></article>
        //   <h3>Comment se déroule une séance ?</h3>
        //   <article dangerouslySetInnerHTML={{__html: proceedings}}></article>
        //   <h3>Quels bienfaits ?</h3>
        //   <article dangerouslySetInnerHTML={{__html: benefits}}></article>
        // </div>
      ))} */}
    </main>
  )
}
export type ServicesItemPageProps = {params: {slug: string}}

// ITEM ************************************************************************************************************************************
function Item({service: {benefits, proceedings}}: {service: Service}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="proceedings">
        <AccordionTrigger>Comment se déroule une séance ?</AccordionTrigger>
        <AccordionContent dangerouslySetInnerHTML={{__html: proceedings ?? ""}} />
      </AccordionItem>
      <AccordionItem value="benefits">
        <AccordionTrigger>Quels sont les bienfaits ?</AccordionTrigger>
        <AccordionContent>{benefits}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
