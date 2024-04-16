import "~/styles/globals.css"

import {CalendarHeart} from "lucide-react"
import {Inter} from "next/font/google"
import Link from "next/link"
import {Button} from "~/components/ui/button"
import {zService} from "~/lib/schemas"
import {db} from "~/server/db"
import Menu from "./_menu"

// FONTS ***********************************************************************************************************************************
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// METADATA ********************************************************************************************************************************
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{rel: "icon", url: "/favicon.ico"}],
}

async function Header() {
  const serviceDtos = await db.query.services.findMany({with: {image: true}})
  // console.log(serviceDtos)
  const services = zService.array().parse(serviceDtos)

  const socials: any[] = []

  const name = ""

  return (
    <header className="sticky top-0 z-20 border-b border-transparent bg-white py-5 transition-all">
      <div className="mx-auto max-w-screen-xl px-5">
        <div className="relative z-10 flex flex-col items-center justify-between lg:flex-row">
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
            <Button variant="secondary" asChild>
              <Link href="/rendez-vous">
                <CalendarHeart className="mr-2 h-4 w-4" />
                Prendre rendez-vous
              </Link>
            </Button>
            {socials.map(({Icon, id, url}) => (
              <Button key={id} size="icon" asChild>
                <a href={url} target="_blank">
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

// MAIN ************************************************************************************************************************************
export default function RootLayout({children}: Props) {
  return (
    <html lang="fr">
      <body className={`font-sans ${inter.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

// TYPES ***********************************************************************************************************************************
interface Props {
  children: React.ReactNode
}
