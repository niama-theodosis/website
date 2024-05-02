import {MeetingButton} from "@/components/meeting-button"
import {Button} from "@/components/ui/button"
import {fetchContact, fetchServices} from "@/lib/db"
import {cn} from "@/lib/utils"
import Link from "next/link"
import Menu from "./menu"

// ROOT ************************************************************************************************************************************
export default async function Header() {
  const [{facebook, instagram, name, youtube}, services] = await Promise.all([fetchContact(), fetchServices()])

  const socials = [
    {id: "instagram", icon: "i-lucide-instagram", url: instagram},
    {id: "youtube", icon: "i-lucide-youtube", url: youtube},
    {id: "facebook", icon: "i-lucide-facebook", url: facebook},
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-transparent bg-white py-5 transition-all">
      <div className="mx-auto max-w-screen-xl px-5">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link
              href="/"
              className="focus-visible:shadow-outline-indigo -ml-2 flex items-center rounded-full px-2 text-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span className="font-heading text-4xl font-bold">{name}</span>
            </Link>
          </div>
          <Menu services={services} />
          <div className="flex gap-2">
            <MeetingButton variant="primary" size="hybrid" />
            {socials.map(({icon, id, url}) => (
              <Button key={id} size="icon" asChild>
                <a href={url ?? ""} target="_blank">
                  <span className={cn(icon, "h-4 w-4")}></span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
