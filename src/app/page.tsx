import {MoreButton} from "@/components/more-button"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {Toaster} from "@/components/ui/sonner"
import Image from "next/image"
import HomeBlog from "./_components/blog"
import NewsletterForm from "./_components/newsletter-form"
import HomeServices from "./_components/services"

// ROOT ************************************************************************************************************************************
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
    <Section variant="default">
      <SectionContent>
        <SectionMain className="lg:col-span-6 xl:col-span-7">
          <SectionHeader className="gap-8 max-w-none lg:text-left">
            <SectionTitle level={1} className="text-5xl md:text-6xl">
              {hero.title}
            </SectionTitle>
            <SectionTagline dangerouslySetInnerHTML={{__html: hero.content}} className="text-justify lg:text-left"></SectionTagline>
          </SectionHeader>
          <MoreButton href="/prestations/alchimie-cellulaire" color="primary" size="lg" className="self-end" />
        </SectionMain>
        <SectionAside className="max-w-lg place-self-center lg:col-span-6 xl:col-span-5">
          <Image src={hero.image} alt="hero" width={512} height={512} className="col-span-12 rounded-full"></Image>
        </SectionAside>
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
    <Section variant="default" className="px-8">
      <SectionContent className="rounded-2xl bg-secondary/10 p-8">
        <SectionAside className="max-w-md place-self-center">
          <Image src={about.image} alt="mockup" width={448} height={448} className="col-span-12 rounded-full"></Image>
        </SectionAside>
        <SectionMain className="place-self-center">
          <SectionHeader>
            <SectionTitle>{about.title}</SectionTitle>
            <SectionTagline dangerouslySetInnerHTML={{__html: about.content}} />
          </SectionHeader>
          <MoreButton href="/qui-suis-je" size="lg" className="self-end" />
        </SectionMain>
      </SectionContent>
    </Section>
  )
}

// NEWSLETTER ******************************************************************************************************************************
function HomeNewsletter() {
  const newsletter = {
    title: `Rejoindre ma newsletter`,
    tagline: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  }

  return (
    <Section>
      <SectionContent>
        <SectionMain className="max-w-2xl mx-auto">
          <SectionHeader>
            <SectionTitle>{newsletter.title}</SectionTitle>
            <SectionTagline>{newsletter.tagline}</SectionTagline>
          </SectionHeader>
          <NewsletterForm />
        </SectionMain>
      </SectionContent>
      <Toaster richColors />
    </Section>
  )
}
