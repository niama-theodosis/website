import {PostsSection} from "@/components/posts-section"
import {fetchPage} from "@/lib/hashnode"
import {notFound} from "next/navigation"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeLastPosts() {
  const data = await fetchPage("accueil-derniers-articles")
  if (!data) notFound()
  const {content, title} = data

  return (
    <PostsSection first={3} title={title} tagline={content.text} className="bg-white" />
  )
}
