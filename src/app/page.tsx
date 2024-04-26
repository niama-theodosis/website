import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {HEADING, P} from "@/components/ui/typography"
import {fetchServices} from "@/lib/db"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import HomeBlog from "./_components/blog"

// MAIN ************************************************************************************************************************************
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between">
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeBlog />
      <HomeNewsletter />
    </main>
  )
}

// HERO ************************************************************************************************************************************
function HomeHero() {
  const hero = {
    image: "https://utfs.io/f/3bf8603c-0ce7-4e28-8b0a-a960cd2fa77e-2ihokg.jpeg",
    title: "Que sont les mémoires cellulaires?",
    content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
    vestibulum mattis ullamcorper velit. In est ante in nibh mauris cursus mattis molestie. Ultrices in iaculis nunc sed augue lacus
    viverra vitae.
    <br />
    <br />
    Cras ornare arcu dui vivamus arcu felis. Purus gravida quis blandit turpis. Felis eget nunc lobortis mattis aliquam faucibus purus
    in.
    `,
  }

  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionMain className="lg:col-span-6 xl:col-span-7">
          <SectionHeader className="gap-8 lg:text-left">
            <SectionTitle level={1} className="text-5xl md:text-6xl">
              {hero.title}
            </SectionTitle>
            <SectionTagline dangerouslySetInnerHTML={{__html: hero.content}} className="text-justify lg:text-left"></SectionTagline>
          </SectionHeader>
          <Button variant="secondary" asChild className="self-end">
            <Link href="/">
              En savoir plus
              <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
            </Link>
          </Button>
        </SectionMain>
        <SectionAside className="max-w-lg place-self-center lg:col-span-6 xl:col-span-5">
          <Image src={hero.image} alt="hero" width={1024} height={1024} className="rounded-full"></Image>
        </SectionAside>
      </SectionContent>
    </Section>
  )
}

// SERVICES ********************************************************************************************************************************
async function HomeServices() {
  const services = await fetchServices()

  return (
    <Section className="bg-neutral-100">
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>Mes prestations</SectionTitle>
            <SectionTagline>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </SectionTagline>
          </SectionHeader>
          <ul className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-4">
            {services.toReversed().map(({excerpt, id, image, meetingUri, name, slug, uri}) => (
              <li key={id} className="flex flex-col gap-5">
                <Image src={image.url} alt={name} width={1024} height={1024} className="aspect-video rounded-2xl object-cover" />
                <div className="flex-1 flex flex-col gap-2 text-center">
                  <h3 className="font-heading text-lg font-bold">{name}</h3>
                  <p className="text-gray-500 flex-1">{excerpt}</p>
                  <div className="mt-6 flex gap-1">
                    <Button
                      asChild
                      size="icon"
                      className={cn(slug === "transmutation-des-memoires-cellulaires" && "bg-secondary hover:bg-secondary/80")}
                    >
                      <Link href={meetingUri}>
                        <span className="i-lucide-calendar-heart h-4 w-4"></span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className={cn(slug === "transmutation-des-memoires-cellulaires" && "bg-secondary hover:bg-secondary/80", "flex-1")}
                    >
                      <Link href={uri}>
                        En savoir plus
                        <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}

// ABOUT ***********************************************************************************************************************************
function HomeAbout() {
  const about = {
    image: "https://utfs.io/f/a41c9d86-75d9-4c01-86ed-65076b88001c-pq140f.jpeg",
    title: "Qui suis-je?",
    content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
    vestibulum mattis ullamcorper velit. In est ante in nibh mauris cursus mattis molestie. Ultrices in iaculis nunc sed augue lacus
    viverra vitae.
    <br />
    <br />
    Cras ornare arcu dui vivamus arcu felis. Purus gravida quis blandit turpis. Felis eget nunc lobortis mattis aliquam faucibus purus
    in.
    `,
  }

  return (
    <Section className="bg-white">
      <SectionContent>
        <SectionMain>
          <Card className="mx-auto flex max-w-screen-xl bg-primary/10">
            <CardHeader className="flex-none p-12">
              <Image src={about.image} alt="mockup" width={1024} height={1024} className="max-w-md rounded-full"></Image>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-8 p-12 pl-0">
              <h2 className={HEADING({level: 2})}>{about.title}</h2>
              <p dangerouslySetInnerHTML={{__html: about.content}} className={P()} />
              <Button asChild className="self-end">
                <Link href="/qui-suis-je">
                  En savoir plus
                  <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}

// NEWSLETTER ******************************************************************************************************************************
function HomeNewsletter() {
  return (
    <Section className="bg-neutral-100">
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>Rejoindre ma newsletter</SectionTitle>
            <SectionTagline>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </SectionTagline>
          </SectionHeader>
          <form action="#">
            <div className="mx-auto mb-3 max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label htmlFor="email" className="mb-2 hidden text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email address
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:rounded-none sm:rounded-l-lg"
                  placeholder="Votre courriel"
                  type="email"
                  id="email"
                  required
                ></input>
              </div>
              <div>
                <Button type="submit" className=" h-[46px] rounded-lg text-sm focus:ring-4 sm:rounded-none sm:rounded-r-lg">
                  M&apos;enregistrer
                </Button>
              </div>
            </div>
            <div className="newsletter-form-footer mx-auto max-w-screen-sm text-left text-sm text-gray-500 dark:text-gray-300">
              We care about the protection of your data.{" "}
              <a href="#" className="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                Read our Privacy Policy
              </a>
              .
            </div>
          </form>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
