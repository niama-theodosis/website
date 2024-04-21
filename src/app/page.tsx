import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {HEADING, P} from "@/components/ui/typography"
import {cn} from "@/lib/utils"
import {fetchServices} from "@/server/db"
import Image from "next/image"
import Link from "next/link"

// MAIN ************************************************************************************************************************************
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <BlogSection />
      <NewsletterSection />
    </main>
  )
}

// HERO ************************************************************************************************************************************
function HeroSection() {
  const hero = {
    title: "Que sont les mémoires cellulaires ?",
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="mr-auto flex flex-col place-self-center lg:col-span-7">
          <h1 className={HEADING({level: 1, class: "mb-8"})}>{hero.title}</h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lectus vestibulum mattis ullamcorper velit. In est ante in nibh mauris cursus mattis molestie. Ultrices in iaculis nunc sed
            augue lacus viverra vitae.
            <br />
            <br />
            Cras ornare arcu dui vivamus arcu felis. Purus gravida quis blandit turpis. Felis eget nunc lobortis mattis aliquam faucibus
            purus in.
          </p>
          <Button variant="secondary" asChild className="self-end">
            <Link href="/">
              En savoir plus
              <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
            </Link>
          </Button>
        </div>
        <div className="hidden overflow-hidden rounded-full lg:col-span-5 lg:mt-0 lg:flex">
          {/* <Image src={heroImg} alt="hero"></Image> */}
        </div>
      </div>
    </section>
  )
}

// SERVICES ********************************************************************************************************************************
async function ServicesSection() {
  const services = await fetchServices()

  return (
    <section className="w-full bg-neutral-100 py-10">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8">
        <header className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className={HEADING({level: 2})}>Mes prestations</h2>
          <p className={P()}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>
        <ul className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-3">
          {services.toReversed().map(({excerpt, id, image, meetingUri, name, slug, uri}) => (
            <li key={id} className="flex flex-col gap-5">
              <Image src={image.url} alt={name} width={1024} height={1024} className="aspect-video rounded-2xl object-cover" />
              <div className="flex flex-col gap-2 text-center">
                <h3 className="font-heading text-lg font-bold">{name}</h3>
                <p className="text-gray-500">{excerpt}</p>
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
      </div>
    </section>
  )
}

// ABOUT ***********************************************************************************************************************************
function AboutSection() {
  return (
    <section className="w-full bg-white py-10">
      <Card className="mx-auto flex max-w-screen-xl bg-primary/10">
        <CardHeader className="flex-none p-12">
          {/* <Image src={aboutImg} alt="mockup" className="max-w-md rounded-full"></Image> */}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-8 p-12 pl-0">
          <h2 className={HEADING({level: 2})}>Qui suis-je ?</h2>
          <p className={P()}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lectus vestibulum mattis ullamcorper velit. In est ante in nibh mauris cursus mattis molestie. Ultrices in iaculis nunc sed
            augue lacus viverra vitae.
            <br />
            <br />
            Cras ornare arcu dui vivamus arcu felis. Purus gravida quis blandit turpis. Felis eget nunc lobortis mattis aliquam faucibus
            purus in.
          </p>
          <Button asChild className="self-end">
            <Link href="/">
              En savoir plus
              <span className="i-lucide-arrow-right ml-2 h-4 w-4"></span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

// // BLOG ************************************************************************************************************************************
function BlogSection() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8">
        <header className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className={HEADING({level: 2})}>Mes derniers articles</h2>
          <p className={P()}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>
        {/* <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-3">
          {posts.map((item) => (
            <PostItem key={item._id} item={item} />
          ))}
        </div> */}
      </div>
    </section>
  )
}

// NEWSLETTER ******************************************************************************************************************************
function NewsletterSection() {
  return (
    <section className="w-full bg-neutral-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-8 sm:text-center">
          <header className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className={HEADING({level: 2})}>Rejoindre ma newsletter</h2>
            <p className={P()}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </header>
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
        </div>
      </div>
    </section>
  )
}
