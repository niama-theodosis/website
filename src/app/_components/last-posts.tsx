import {PostsSection} from "@/components/posts-section"
import {fetchHome} from "@/lib/pocketbase"

// CACHE ***********************************************************************************************************************************
// export const revalidate = 0 // 86400 // 1 day

// ROOT ************************************************************************************************************************************
export async function HomeLastPosts() {
  const {lastPosts} = await fetchHome()
  const {tagline, title} = lastPosts

  return (
    <PostsSection first={3} title={title} tagline={tagline} className="bg-white" />
  )
}
