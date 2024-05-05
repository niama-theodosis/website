import {PostsSection} from "@/components/posts-section"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {graphql} from "@/lib/hashnode/graphql"

// GQL *************************************************************************************************************************************
const PublicationQuery = graphql(`
  query Posts($host: String!) {
    publication(host: $host) {
      about {
        text
      }
      displayTitle
      title
    }
  }
`)

const fetchPublication = async () => {
  const data = await hashnode.request(PublicationQuery, {host: env.HASHNODE_PUBLICATION_HOST})
  const title = data.publication?.displayTitle ?? data.publication?.title ?? "Blog"
  const tagline = data.publication?.about?.text ?? "Découvrez nos articles"
  return {title, tagline}
}

// ROOT ************************************************************************************************************************************
export default async function BlogPage() {
  const {tagline, title} = await fetchPublication()

  return (
    <PostsSection first={20} tagline={tagline} title={title} className="flex-1" />
  )
}
