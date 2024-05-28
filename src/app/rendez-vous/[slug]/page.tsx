import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import Iframe from "@/components/ui/iframe"
import {fetchService} from "@/lib/pocketbase"
import Link from "next/link"
import {notFound} from "next/navigation"

// STATIC **********************************************************************************************************************************
export {fetchServiceSlugs as generateStaticParams} from "@/lib/pocketbase"

// ROOT ************************************************************************************************************************************
export default async function MeetingItemPage({params: {slug}}: Props) {
  const item = await fetchService(slug)
  const {name, zcalUrl} = item ?? notFound()

  return (
    <section className="relative flex flex-1 flex-col items-center justify-between gap-4 pt-4">
      <Breadcrumb className="flex-none">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Accueil</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/rendez-vous">Rendez-vous</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Iframe src={zcalUrl} className="z-10 w-full flex-1" />
    </section>
  )
}

// TYPES ***********************************************************************************************************************************
type Props = {params: {slug: string}}
