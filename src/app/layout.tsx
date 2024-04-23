import "@/styles/globals.css"

import {ThemeProvider} from "@/app/_components/theme-provider"
import {Button} from "@/components/ui/button"
import {fetchContact, fetchServices} from "@/lib/db"
import {cn} from "@/lib/utils"
import {Poppins, Quicksand} from "next/font/google"
import Link from "next/link"
import Menu from "./_components/menu"

// FONTS ***********************************************************************************************************************************
const poppins = Poppins({weight: "700", subsets: ["latin"], variable: "--font-heading"})
const quicksand = Quicksand({subsets: ["latin"], variable: "--font-base"})

// METADATA ********************************************************************************************************************************
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{rel: "icon", url: "/favicon.ico"}],
}

// MAIN ************************************************************************************************************************************
export default function RootLayout({children}: Props) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "font-base flex min-h-screen flex-col overflow-x-hidden overflow-y-scroll antialiased",
          poppins.variable,
          quicksand.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

// COMPONENTS ******************************************************************************************************************************
function Footer() {
  return (
    <footer className="flex justify-between border-t-[1px] bg-neutral-700 p-6 text-white">
      <Link href="/mentions-legales">Mentions légales</Link>
      <div>Copyright © 2024 Theodosis. Tous droits réservés.</div>
    </footer>
  )
}

async function Header() {
  const [{facebook, instagram, name, youtube}, services] = await Promise.all([fetchContact(), fetchServices()])

  const socials = [
    {id: "instagram", icon: "i-lucide-instagram", url: instagram},
    {id: "youtube", icon: "i-lucide-youtube", url: youtube},
    {id: "facebook", icon: "i-lucide-facebook", url: facebook},
  ]

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
                <span className="i-lucide-calendar-heart mr-2 h-4 w-4 "></span>
                Prendre rendez-vous
              </Link>
            </Button>
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

// TYPES ***********************************************************************************************************************************
interface Props {
  children: React.ReactNode
}
