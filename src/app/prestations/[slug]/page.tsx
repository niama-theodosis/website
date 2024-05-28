import {MeetingButton} from "@/components/meeting-button"
import ServiceCard from "@/components/service-card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Prose} from "@/components/ui/prose"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {Separator} from "@/components/ui/separator"
import {fetchOtherServices, fetchService, } from "@/lib/pocketbase"
import type {Service} from "@/lib/pocketbase/schemas"
import {getServiceColor, getServicePrice} from "@/lib/utils"
import Image from "next/image"
import {notFound} from "next/navigation"

// STATIC **********************************************************************************************************************************
export {fetchServiceSlugs as generateStaticParams} from "@/lib/pocketbase"
  
// ROOT ************************************************************************************************************************************
export default async function ServicesItemPage({params: {slug}}: ServicesItemPageProps) {
  const item = await fetchService(slug)
  
  if (!item) notFound()
  const {benefits, content, duration, image, name, payments, places, price, proceedings, reasons} = item

  return (
    <>
      <Section className="flex-1 items-start">
        <SectionContent>
          <SectionMain>
            <SectionHeader>
              <SectionTitle>{name}</SectionTitle>
            </SectionHeader>
            <Prose dangerouslySetInnerHTML={{__html: content}} />
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="reasons">
                <AccordionTrigger variant={getServiceColor(slug)}>Pourquoi opter pour une séance ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose dangerouslySetInnerHTML={{__html: reasons}} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="proceedings">
                <AccordionTrigger variant={getServiceColor(slug)}>Comment celle-ci se déroule-t-elle ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose dangerouslySetInnerHTML={{__html: proceedings}} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="benefits">
                <AccordionTrigger variant={getServiceColor(slug)}>Quels en sont les bienfaits ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose dangerouslySetInnerHTML={{__html: benefits}} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionMain>
          <SectionAside className="gap-8 place-self-start">
            <Image src={image.src} alt={name} width={1024} height={1024} className="col-span-12 rounded-2xl md:col-span-6 lg:col-span-12" />
            <Card className="p-6 col-span-12 md:col-span-6 lg:col-span-12">
              <CardHeader>
                <CardTitle>Vous êtes intéressé·e?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <ServiceDuration duration={duration} />
                  <ServicePrice price={price} />
                </div>
                <Separator />
                <ServicePayments payments={payments} />
                <ServicePlaces places={places} />
              </CardContent>
              <CardFooter className="justify-center">
                <MeetingButton service={slug} size="lg" />
              </CardFooter>
            </Card>
          </SectionAside>
        </SectionContent>
      </Section>
      <OtherServices slug={slug} />
    </>
  )
}
export type ServicesItemPageProps = {params: {slug: string}}

// OTHER SERVICES **************************************************************************************************************************
async function OtherServices({slug}: {slug: string}) {
  const services = await fetchOtherServices(slug)
  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionMain>
        <SectionHeader>
            <SectionTitle>Mes autres prestations</SectionTitle>
            <SectionTagline>
              Vous pouvez également être intéressé·e par
            </SectionTagline>
          </SectionHeader>
          <div className="mx-auto grid max-w-screen-xl gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}

// DURATION ********************************************************************************************************************************
function ServiceDuration({duration}: Pick<Service, "duration">) {
  return (
    <div className="space-x-2 text-lg">
      <span className="font-bold">Durée</span>
      <span>{duration}</span>
    </div>
  )
}

// PAYMENTS ********************************************************************************************************************************
function ServicePayments({payments}: Pick<Service, "payments">) {
  const i18n = new Map(
    Object.entries({
      cash: "espèce",
      check: "chèque",
      creditCard: "carte de crédit",
    })
  )

  return (
    <div className="space-y-1">
      <div className="font-bold">Moyens de paiement</div>
      <div className="space-x-1">
        {payments.map((payment) => (
          <Badge key={payment}>{i18n.get(payment)}</Badge>
        ))}
      </div>
    </div>
  )
}

// PLACES **********************************************************************************************************************************
function ServicePlaces({places}: Pick<Service, "places">) {
  const i18n = new Map(
    Object.entries({
      faceToFace: "physique",
      remotely: "en ligne",
    })
  )

  return (
    <div className="space-y-1">
      <div className="font-bold">Endroits</div>
      <div className="space-x-1">
        {places.map((place) => (
          <Badge key={place}>{i18n.get(place)}</Badge>
        ))}
      </div>
    </div>
  )
}

// PRICE ***********************************************************************************************************************************
function ServicePrice({price}: Pick<Service, "price">) {
  return (
    <div className="space-x-2 text-lg">
      <span className="font-bold ">Prix</span>
      <span>{getServicePrice(price)}</span>
    </div>
  )
}
