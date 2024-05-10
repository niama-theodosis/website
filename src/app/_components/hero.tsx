import {MoreButton} from "@/components/more-button"
import {
  Section,
  SectionAside,
  SectionContent,
  SectionHeader,
  SectionMain,
  SectionTitle,
  TAGLINE
} from "@/components/ui/section"
import {fetchPage} from "@/lib/hashnode"
import Image from "next/image"
import {notFound} from "next/navigation"

// CACHE ***********************************************************************************************************************************
export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeHero() {
  const data = await fetchPage("accueil-que-sont-les-memoires-cellulaires")
  if (!data) notFound()
  const {content, image, title} = data

  return (
    <Section variant="default">
      <SectionContent>
        <SectionMain className="lg:col-span-6 xl:col-span-7">
          <SectionHeader className="max-w-none gap-8 lg:text-left">
            <SectionTitle level={1} className="text-5xl md:text-6xl">
              {title}
            </SectionTitle>
            <div dangerouslySetInnerHTML={{__html: content.html}} className={TAGLINE({className: "text-justify lg:text-left"})} />
          </SectionHeader>
          <MoreButton href="/prestations/alchimie-cellulaire" color="primary" size="lg" className="self-end" />
        </SectionMain>
        {image && (
          <SectionAside className="max-w-lg place-self-center lg:col-span-6 xl:col-span-5">
            <Image src={image} alt="hero" width={512} height={512} priority className="col-span-12 rounded-full"></Image>
          </SectionAside>
        )}
      </SectionContent>
    </Section>
  )
}
