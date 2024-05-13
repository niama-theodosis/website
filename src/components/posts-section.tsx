import PostCard, {PostNone, PostSkeleton} from "@/components/post-card"
import {fetchPosts, fetchPostsByTag} from "@/lib/hashnode"
import {Suspense, forwardRef} from "react"
import {Section, SectionContent, SectionHeader, SectionMain, SectionTagline, SectionTitle, type SectionProps} from "./ui/section"

// ROOT ************************************************************************************************************************************
export const PostsSection = forwardRef<HTMLElement, PostsSectionProps>(async ({after, first, tag, tagline, title, ...props}, ref) => {
  return (
    <Section ref={ref} {...props}>
      <SectionContent>
        <SectionMain>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionTagline>{tagline}</SectionTagline>
          </SectionHeader>
          <div className="mx-auto grid w-full max-w-screen-xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<Loading count={first} />}>
              <Posts after={after} first={first} tag={tag} />
            </Suspense>
          </div>
        </SectionMain>
      </SectionContent>
    </Section>
  )
})
PostsSection.displayName = "PostsSection"

// ITEMS ***********************************************************************************************************************************
async function Posts({after, first, tag}: Pick<PostsSectionProps, "after" | "first" | "tag">) {
  const posts = await (tag ? fetchPostsByTag(tag, first, after) : fetchPosts(first, after))

  if (posts.length === 0) return <PostNone />
  return (
    <>
      {posts.map(({node: data}, i) => (
        <PostCard key={i} data={data} />
      ))}
    </>
  )
}

// LOADING *********************************************************************************************************************************
function Loading({count}: {count: number}) {
  return (
    <>
      {Array.from(Array(count).keys()).map((index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  )
}

// TYPES ************************************************************************************************************************************
export type PostsSectionProps = SectionProps & {after?: string; first: number; tag?: string; tagline: string; title: string}
