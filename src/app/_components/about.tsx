import {MoreButton} from "@/components/more-button"
import {Prose} from "@/components/ui/prose"
import {Section, SectionAside, SectionContent, SectionHeader, SectionMain, SectionTitle} from "@/components/ui/section"
import {fetchHome} from "@/lib/pocketbase"
import Image from "next/image"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeAbout() {
  const {about} = await fetchHome()
  const {content, image, title} = about

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
            <Prose dangerouslySetInnerHTML={{__html: content}} />
          </SectionHeader>
          <MoreButton href="/qui-suis-je" size="lg" className="self-end" />
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
