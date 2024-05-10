import {
  Section,
  SectionContent,
  SectionHeader,
  SectionMain,
  SectionTagline,
  SectionTitle
} from "@/components/ui/section"
import {Toaster} from "@/components/ui/sonner"
import {fetchPage} from "@/lib/hashnode"
import {notFound} from "next/navigation"
import NewsletterForm from "./newsletter-form"

// CACHE ***********************************************************************************************************************************
export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeNewsletter() {
  const data = await fetchPage("accueil-newsletter")
  if (!data) notFound()
  const {content, title} = data

  return (
    <Section>
      <SectionContent>
        <SectionMain className="max-w-2xl mx-auto">
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{content.text}</SectionTagline>
          </SectionHeader>
          <NewsletterForm />
        </SectionMain>
      </SectionContent>
      <Toaster richColors />
    </Section>
  )
}
