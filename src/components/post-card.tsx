import {graphql, readFragment, type FragmentOf} from "@/lib/hashnode/graphql"
import D from "dayjs"
import "dayjs/locale/fr"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import {MoreButton} from "./more-button"
import TagBadge, {TagBadgeFragment} from "./tag-badge"
import {Badge} from "./ui/badge"
import {Card, CardContent, CardFooter, CardHeader} from "./ui/card"
import {Skeleton} from "./ui/skeleton"
D.extend(relativeTime)
D.locale("fr")

// GQL *************************************************************************************************************************************
export const PostCardFragment = graphql(
  `
    fragment PostCard on Post {
      brief
      coverImage {
        url
      }
      publishedAt
      readTimeInMinutes
      slug
      tags {
        ...TagBadge
      }
      title
      views
    }
  `,
  [TagBadgeFragment]
)

// ROOT ************************************************************************************************************************************
export default function PostCard({data}: PostCardProps) {
  const {brief, publishedAt, readTimeInMinutes, slug, title, views, ...r} = readFragment(PostCardFragment, data)
  const coverImage = r.coverImage?.url ?? "https://utfs.io/f/3bf8603c-0ce7-4e28-8b0a-a960cd2fa77e-2ihokg.jpeg" // "TODO: Add default cover image"
  const tags = r.tags ?? []
  const ago = D(publishedAt).fromNow()

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-4">
        <Link href={`/blog/${slug}`}>
          <Image src={coverImage} alt={title} width={1600} height={900} className="aspect-video rounded-2xl object-cover" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-4 text-center">
        <div className="flex flex-none flex-wrap items-center justify-center gap-1">
          {tags.map((tag, i) => (
            <TagBadge key={i} data={tag} />
          ))}
        </div>
        <Link href={`/blog/${slug}`} className="block flex-none">
          <h3 className="text-balance font-heading text-2xl font-bold tracking-tight">{title}</h3>
        </Link>
        <p className="flex-1 text-justify text-gray-500">{brief}</p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4 p-4">
        <MoreButton href={`/blog/${slug}`} label="Lire" />
        <Badge variant="accent" className="justify-center">
          {ago} - {views} Vues - {readTimeInMinutes} min
        </Badge>
      </CardFooter>
    </Card>
  )
}

// ROOT ************************************************************************************************************************************
export function PostSkeleton() {
  return (
    <Card className="flex-1">
      <CardHeader className="p-4">
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-center gap-1">
          {[0,1].map((index) => (
            <Skeleton key={index} className="h-[22px] w-20 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-36 w-full" />
      </CardContent>
      <CardFooter className="flex-col gap-4 p-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-[22px] w-full rounded-full" />
      </CardFooter>
    </Card>
  )
}

// TYPES ***********************************************************************************************************************************
export type PostCardProps = {data: FragmentOf<typeof PostCardFragment>}
