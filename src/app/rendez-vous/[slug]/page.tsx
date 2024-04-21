import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import {fetchService} from "@/server/db"
import Link from "next/link"
import {notFound} from "next/navigation"

// MAIN ************************************************************************************************************************************
export default async function MeetingItemPage({params: {slug}}: MeetingItemPageProps) {
  const item = await fetchService(slug)
  const {name, zcalUrl} = item ?? notFound()

  return (
    <section className="relative flex flex-1 flex-col items-center justify-between gap-4 px-24 py-8">
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

      <div className="absolute top-32 flex w-full justify-center">
        <Alert className="w-auto">
          <AlertTitle>Encore quelques instants</AlertTitle>
          <AlertDescription>L&apos;agenda est en cours de chargement...</AlertDescription>
        </Alert>
      </div>

      <iframe src={zcalUrl} loading="lazy" className="z-10 w-full flex-1" />
    </section>
  )
}
export type MeetingItemPageProps = {params: {slug: string}}
