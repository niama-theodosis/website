import {PostExtras, PostExtrasFragment, PostTags, PostTagsFragment} from "@/components/post-card"
import {Card} from "@/components/ui/card"
import {Prose} from "@/components/ui/prose"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle} from "@/components/ui/section"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {PublicationFragment} from "@/lib/hashnode/fragments"
import {graphql} from "@/lib/hashnode/graphql"
import Image from "next/image"
import {notFound} from "next/navigation"

// ROOT ************************************************************************************************************************************
const PostQuery = graphql(
  `
    query Post($slug: String!, $host: String!) {
      publication(host: $host) {
        ...Publication
        post(slug: $slug) {
          content {
            html
          }
          coverImage {
            url
          }
          subtitle
          title
          ...PostExtras
          ...PostTags
        }
      }
    }
  `,
  [PublicationFragment, PostExtrasFragment, PostTagsFragment]
)

export default async function BlogPostPage({params: {slug}}: BlogPostPageProps) {
  const data = await hashnode.request(PostQuery, {host: env.HASHNODE_PUBLICATION_HOST, slug})
  if (!data?.publication?.post) notFound()
  const {content, subtitle, title, ...r} = data.publication.post
  const coverImage = r.coverImage?.url ?? "https://utfs.io/f/3bf8603c-0ce7-4e28-8b0a-a960cd2fa77e-2ihokg.jpeg" //TODO: Add default cover image"

  return (
    <Section>
      <SectionContent>
        <SectionMain>
          <Image className="rounded-lg" src={coverImage} alt={title} width={1920} height={1080} />
          <Card className="gap-8">
            <SectionHeader className="max-w-none">
              <SectionTitle>{title}</SectionTitle>
              {subtitle && <SectionTagline>{subtitle}</SectionTagline>}
            </SectionHeader>
            <PostTags data={r} />
            <PostExtras data={r} variant="secondary" className="gap-4 sm:text-base md:text-lg" />
          </Card>
          <Prose dangerouslySetInnerHTML={{__html: content.html}}></Prose>
        </SectionMain>
      </SectionContent>
    </Section>
  )
}
export type BlogPostPageProps = {
  params: {slug: string}
}
