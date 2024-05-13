import ServiceCard from "@/components/service-card"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {fetchServices} from "@/lib/db"
import {fetchPage} from "@/lib/hashnode"
import {notFound} from "next/navigation"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export default async function HomeServices() {
  const data = await fetchPage("accueil-mes-prestations")
  if (!data) notFound()
  const {content, title} = data
  const services = await fetchServices()

  return (
    <Section>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{content.text}</SectionTagline>
          </SectionHeader>
          <div className="mx-auto grid max-w-screen-xl gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
