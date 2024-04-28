import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {Toaster} from "@/components/ui/sonner"
import {HEADING} from "@/components/ui/typography"
import {fetchContact} from "@/lib/db"
import dynamic from "next/dynamic"
import ContactForm from "./_components/form"

// MAIN ************************************************************************************************************************************
export default async function ContactPage() {
  const {lat, lng} = await fetchContact()

  return (
    <>
      <Section className="flex-1">
        <SectionContent>
          <SectionMain>
            <SectionHeader>
              <SectionTitle>Contactez-moi</SectionTitle>
              <SectionTagline>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </SectionTagline>
            </SectionHeader>
            <ContactForm />
          </SectionMain>
          <SectionAside>
            <Aside />
          </SectionAside>
        </SectionContent>
      </Section>
      <Map center={[lat, lng]} zoom={13} className="h-96 w-full" />
      <Toaster richColors />
    </>
  )
}

// ASIDE ************************************************************************************************************************************
async function Aside() {
  const {city, email, phone, street, zipcode} = await fetchContact()

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-8 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-xl bg-secondary p-4 text-secondary-foreground">
            <span className="i-lucide-map-pin h-8 w-8"></span>
          </div>
          <h4 className={HEADING({level: 4})}>Adresse :</h4>
          <div>
            <p>{street}</p>
            <p>
              {zipcode} <span className="uppercase">{city}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-xl bg-secondary p-4 text-secondary-foreground">
            <span className="i-lucide-phone h-8 w-8"></span>
          </div>
          <h4 className={HEADING({level: 4})}>Téléphone :</h4>
          <div>
            <p>N&apos;hésitez pas à me contacter si vous avez la moindre question :</p>
            <Button variant="link" asChild className="text-lg">
              <a href={`tel:${phone}`}>{phone}</a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-xl bg-secondary p-4 text-secondary-foreground">
            <span className="i-lucide-mail h-8 w-8"></span>
          </div>
          <h4 className={HEADING({level: 4})}>Courriel :</h4>
          <div>
            <p>Vous pouvez aussi me contacter directement par courriel :</p>
            <Button variant="link" asChild className="text-lg">
              <a href={`mailto:${email}`}>{email}</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// MAP ************************************************************************************************************************************
const Map = dynamic(() => import("./_components/map"), {
  ssr: false,
})
