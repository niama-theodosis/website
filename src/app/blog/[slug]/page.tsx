import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {PostFragment, PublicationFragment} from "@/lib/hashnode/fragments"
import {graphql, readFragment} from "@/lib/hashnode/graphql"
import Image from "next/image"
import {notFound} from "next/navigation"

// GQL *************************************************************************************************************************************
const Query = graphql(
  `
    query SinglePostByPublication($slug: String!, $host: String!) {
      publication(host: $host) {
        ...Publication
        post(slug: $slug) {
          ...Post
        }
      }
    }
  `,
  [PostFragment, PublicationFragment]
)

// DATA ************************************************************************************************************************************
export default async function BlogArticlePage({params: {slug}}: Props) {
  const data = await hashnode.request(Query, {host: env.HASHNODE_PUBLICATION_HOST, slug})
  if (!data?.publication?.post) notFound()
  const {content, subtitle, title, ...r} = readFragment(PostFragment, data.publication.post)
  const coverImage = r.coverImage?.url ?? "TODO: Add default cover image"
  const tags = r.tags ?? []

  return (
    <article className="mt-3 flex flex-col bg-white p-3">
      <Image className="rounded-lg" src={coverImage} alt={title} />
      <h1 className="pt-5 text-4xl font-bold">{title}</h1>
      <h2 className="pb-3 pt-3 text-xl" aria-label="CoverPhoto Subtitle">
        {subtitle}
      </h2>

      {/* <Author data={post} /> */}

      <div className="mb-5 mt-5 flex flex-wrap items-center justify-center">
        {/* {tags.map((tag, i) => (
          <TagBadge key={i} data={tag} />
        ))} */}
      </div>

      <div className="post-details">
        {/* <Markup
          content={content.html}
          components={{
            img: RemoteImage,
          }}
        /> */}
      </div>
    </article>
  )
}

// TYPES ***********************************************************************************************************************************
type Props = {
  params: {slug: string}
}
