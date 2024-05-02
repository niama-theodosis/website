import ServiceCard from "@/components/service-card"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {fetchServices} from "@/lib/db"

// ROOT ************************************************************************************************************************************
export default async function HomeServices() {
  const services = await fetchServices()

  return (
    <Section>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>Mes prestations</SectionTitle>
            <SectionTagline>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </SectionTagline>
          </SectionHeader>
          <div className="mx-auto grid max-w-screen-xl gap-8 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
