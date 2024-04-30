import {MeetingButton} from "@/components/meeting-button"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Prose} from "@/components/ui/prose"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTitle} from "@/components/ui/section"
import {Separator} from "@/components/ui/separator"
import {env} from "@/env"
import {fetchService} from "@/lib/db"
import {hashnode} from "@/lib/hashnode"
import {StaticPageFragment} from "@/lib/hashnode/fragments"
import {graphql, readFragment} from "@/lib/hashnode/graphql"
import type {Service} from "@/lib/schemas"
import {getServiceDuration, getServicePrice, getServiceVariant} from "@/lib/utils"
import Image from "next/image"
import {notFound} from "next/navigation"

// GQL *************************************************************************************************************************************
const Query = graphql(
  `
    query PageByPublication($host: String!, $benefits: String!, $intro: String!, $proceedings: String!, $reasons: String!) {
      publication(host: $host) {
        benefits: staticPage(slug: $benefits) {
          ...StaticPage
        }
        intro: staticPage(slug: $intro) {
          ...StaticPage
        }
        proceedings: staticPage(slug: $proceedings) {
          ...StaticPage
        }
        reasons: staticPage(slug: $reasons) {
          ...StaticPage
        }
      }
    }
  `,
  [StaticPageFragment]
)

// MAIN ************************************************************************************************************************************
export default async function ServicesItemPage({params: {slug}}: ServicesItemPageProps) {
  const [{publication}, item] = await Promise.all([
    hashnode.request(Query, {
      host: env.HASHNODE_PUBLICATION_HOST,
      benefits: `prestations-${slug}-bienfaits`,
      intro: `prestations-${slug}-introduction`,
      proceedings: `prestations-${slug}-deroulement`,
      reasons: `prestations-${slug}-raisons`,
    }),
    fetchService(slug),
  ])

  if (!item || !publication?.benefits || !publication?.intro || !publication?.proceedings || !publication?.reasons) notFound()

  const benefits = readFragment(StaticPageFragment, publication.benefits)
  const intro = readFragment(StaticPageFragment, publication.intro)
  const proceedings = readFragment(StaticPageFragment, publication.proceedings)
  const reasons = readFragment(StaticPageFragment, publication.reasons)
  const {duration, image, name, payments, places, price} = item

  return (
    <>
      <Section className="flex-1 items-start">
        <SectionContent>
          <SectionMain>
            <SectionHeader>
              <SectionTitle>{name}</SectionTitle>
            </SectionHeader>
            <Prose content={intro.content.html} />
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="reasons">
                <AccordionTrigger variant={getServiceVariant(slug)}>Pourquoi opter pour une séance ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose content={reasons.content.html} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="proceedings">
                <AccordionTrigger variant={getServiceVariant(slug)}>Comment celle-ci se déroule-t-elle ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose content={proceedings.content.html} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="benefits">
                <AccordionTrigger variant={getServiceVariant(slug)}>Quels en sont les bienfaits ?</AccordionTrigger>
                <AccordionContent className="text-base">
                  <Prose content={benefits.content.html} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SectionMain>
          <SectionAside className="gap-8 place-self-start">
            <Image src={image.url} alt={name} width={1024} height={1024} className="col-span-12 rounded-2xl md:col-span-6 lg:col-span-12" />
            <Card className="col-span-12 md:col-span-6 lg:col-span-12">
              <CardHeader>
                <CardTitle>Vous êtes intéressé·e?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
      <OtherServices />
    </>
  )
}
export type ServicesItemPageProps = {params: {slug: string}}

// OTHER SERVICES **************************************************************************************************************************
function OtherServices() {
  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionMain>Autres</SectionMain>
      </SectionContent>
    </Section>
  )
}

// DURATION ********************************************************************************************************************************
function ServiceDuration({duration}: Pick<Service, "duration">) {
  return (
    <div className="space-x-2 text-lg">
      <span className="font-bold">Durée</span>
      <span>{getServiceDuration(duration)}</span>
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
