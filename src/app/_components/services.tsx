import ServiceCard from "@/components/service-card"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {fetchHome, fetchServices} from "@/lib/pocketbase"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export default async function HomeServices() {
  const home = await fetchHome()
  const {tagline, title} = home.services
  const services = await fetchServices()

  return (
    <Section>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{tagline}</SectionTagline>
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
