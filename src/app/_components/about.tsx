import {MoreButton} from "@/components/more-button"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTitle, TAGLINE} from "@/components/ui/section"
import {fetchPage} from "@/lib/hashnode"
import Image from "next/image"
import {notFound} from "next/navigation"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeAbout() {
  const data = await fetchPage("accueil-qui-suis-je")
  if (!data) notFound()
  const {content, image, title} = data

  return (
    <Section variant="default" className="px-8">
      <SectionContent className="rounded-2xl bg-secondary/10 p-8">
        {image && (
          <SectionAside className="max-w-md place-self-center">
            <Image src={image} alt="mockup" width={448} height={448} className="col-span-12 rounded-full"></Image>
          </SectionAside>
        )}
        <SectionMain className="place-self-center">
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <div dangerouslySetInnerHTML={{__html: content.html}} className={TAGLINE({className: "text-justify lg:text-left"})} />
          </SectionHeader>
          <MoreButton href="/qui-suis-je" size="lg" className="self-end" />
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
