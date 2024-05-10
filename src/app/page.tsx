import {HomeAbout} from "./_components/about"
import {HomeHero} from "./_components/hero"
import {HomeLastPosts} from "./_components/last-posts"
import {HomeNewsletter} from "./_components/newsletter"
import HomeServices from "./_components/services"

// ROOT ************************************************************************************************************************************
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between">
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeLastPosts />
      <HomeNewsletter />
    </main>
  )
}
