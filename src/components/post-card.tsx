import {graphql, readFragment, type FragmentOf} from "@/lib/hashnode/graphql"
import {cn} from "@/lib/utils"
import D from "dayjs"
import "dayjs/locale/fr"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import {forwardRef} from "react"
import {MoreButton} from "./more-button"
import {Alert, AlertDescription, AlertTitle} from "./ui/alert"
import {BADGE, Badge, type BadgeProps} from "./ui/badge"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card"
import {Skeleton} from "./ui/skeleton"

D.extend(relativeTime)
D.locale("fr")

// TAGS ************************************************************************************************************************************
export const PostTagsFragment = graphql(`
  fragment PostTags on Post {
    tags {
      name
      slug
    }
  }
`)
export type PostTagsData = FragmentOf<typeof PostTagsFragment>

export const PostTags = forwardRef<HTMLDivElement, PostTagsProps>(({className, data, variant, ...props}, ref) => {
  const {tags} = readFragment(PostTagsFragment, data)
  return (
    <div ref={ref} className={cn("flex flex-none flex-wrap items-center justify-center gap-1", className)} {...props}>
      {(tags ?? []).map(({name, slug}, i) => (
        <Link key={i} href={`/blog/tags/${slug}`} className={BADGE({variant})}>
          {name}
        </Link>
      ))}
    </div>
  )
})
PostTags.displayName = "PostTags"
export type PostTagsProps = BadgeProps & {data: PostTagsData}

// EXTRAS **********************************************************************************************************************************
export const PostExtrasFragment = graphql(`
  fragment PostExtras on Post {
    publishedAt
    readTimeInMinutes
    views
  }
`)
export type PostExtrasData = FragmentOf<typeof PostExtrasFragment>

export const PostExtras = forwardRef<HTMLDivElement, PostExtrasProps>(({className, data, variant, ...props}, ref) => {
  const {publishedAt, readTimeInMinutes, views} = readFragment(PostExtrasFragment, data)
  const ago = D(publishedAt).fromNow()

  return (
    <Badge ref={ref} variant={variant} className={cn("justify-center gap-1", className)} {...props}>
      <span>{ago}</span>
      <span>·</span>
      <span>{views} Vues</span>
      <span>·</span>
      <div className="flex gap-1 items-center">
        <span className="i-lucide-book-open h-3 w-3" />
        <span>{readTimeInMinutes} min</span>
      </div>
    </Badge>
  )
})
PostExtras.displayName = "PostExtras"
export type PostExtrasProps = BadgeProps & {data: PostExtrasData}

// ROOT ************************************************************************************************************************************
export const PostCardFragment = graphql(
  `
    fragment PostCard on Post {
      brief
      coverImage {
        url
      }
      slug
      title
      ...PostExtras
      ...PostTags
    }
  `,
  [PostExtrasFragment, PostTagsFragment]
)
export type PostCardData = FragmentOf<typeof PostCardFragment>

export default function PostCard({data}: PostCardProps) {
  const {brief, slug, title, ...r} = readFragment(PostCardFragment, data)
  const coverImage = r.coverImage?.url ?? "https://utfs.io/f/3bf8603c-0ce7-4e28-8b0a-a960cd2fa77e-2ihokg.jpeg" // "TODO: Add default cover image"

  return (
    <Card>
      <CardHeader>
        <Link href={`/blog/${slug}`}>
          <Image src={coverImage} alt={title} width={1600} height={900} className="aspect-video rounded-2xl object-cover" />
        </Link>
      </CardHeader>
      <CardContent className="text-center">
        <PostTags data={r} />
        <Link href={`/blog/${slug}`} className="block flex-none">
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardDescription className="flex-1 text-justify text-base">{brief}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <MoreButton href={`/blog/${slug}`} label="Lire" />
        <PostExtras data={r} />
      </CardFooter>
    </Card>
  )
}
export type PostCardProps = {data: PostCardData}

// SKELETON ********************************************************************************************************************************
export function PostSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-1">
          {[0, 1].map((index) => (
            <Skeleton key={index} className="h-[22px] w-20 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-36 w-full" />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-[22px] w-full rounded-full" />
      </CardFooter>
    </Card>
  )
}

// NONE ************************************************************************************************************************************
export function PostNone() {
  return (
    <div className="flex col-span-12 items-center justify-center">
      <Alert className="w-auto">
        <AlertTitle>Revenez prochainement!</AlertTitle>
        <AlertDescription>Il n&apos;y a actuellement encore aucun article.</AlertDescription>
      </Alert>
    </div>
  )
}
