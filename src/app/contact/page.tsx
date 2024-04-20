import dynamic from "next/dynamic"
import {Button} from "~/components/ui/button"
import {Card, CardContent} from "~/components/ui/card"
import {Toaster} from "~/components/ui/sonner"
import {HEADING} from "~/components/ui/typography"
import {fetchContact} from "~/server/db"
import ContactForm from "./_components/form"

// MAIN ************************************************************************************************************************************
export default async function ContactPage() {
  const {lat, lng} = await fetchContact()

  return (
    <section className="flex-1">
      <div className="flex items-center px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
          <h1 className="font-heading mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
            Contactez-moi
          </h1>
          <p className="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ContactForm />
        </div>
        <Aside />
      </div>
      <Map center={[lat, lng]} zoom={13} className="h-96 w-full" />
      <Toaster richColors />
    </section>
  )
}

// ASIDE ************************************************************************************************************************************
async function Aside() {
  const {city, email, phone, street, zipcode} = await fetchContact()

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-8 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="i-lucide-map-pin h-16 w-16 rounded-xl bg-primary p-4 text-primary-foreground"></span>
          {/* <MapPin className="h-16 w-16 rounded-xl bg-primary p-4 text-primary-foreground" /> */}
          <h4 className={HEADING({level: 4})}>Adresse :</h4>
          <div>
            <p>{street}</p>
            <p>
              {zipcode} <span className="uppercase">{city}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          {/* <Phone className="h-16 w-16 rounded-xl bg-primary p-4 text-primary-foreground" /> */}
          <h4 className={HEADING({level: 4})}>Téléphone :</h4>
          <div>
            <p>N&apos;hésitez pas à me contacter si vous avez la moindre question :</p>
            <Button variant="link" asChild className="text-lg">
              <a href={`tel:${phone}`}>{phone}</a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          {/* <Mail className="h-16 w-16 rounded-xl bg-primary p-4 text-primary-foreground" /> */}
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
