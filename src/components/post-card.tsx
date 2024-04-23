import {graphql, readFragment, type FragmentOf} from "@/lib/hashnode/graphql"
import Image from "next/image"
import Link from "next/link"
import TagBadge, {TagBadgeFragment} from "./tag-badge"

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

// MAIN ************************************************************************************************************************************
export default function PostCard({data}: Props) {
  const {brief, publishedAt, readTimeInMinutes, slug, title, views, ...r} = readFragment(PostCardFragment, data)
  const coverImage = r.coverImage?.url ?? "TODO: Add default cover image"
  const tags = r.tags ?? []

  return (
    <article className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/blog/${slug}`} className="flex-none">
        <Image className="w-full rounded-lg" src={coverImage} alt={title} width={600} height={400} />
      </Link>
      <div className="flex flex-none flex-wrap items-center gap-1">
        {tags.map((tag, i) => (
          <TagBadge key={i} data={tag} />
        ))}
      </div>
      <h2 className="font-heading flex-none text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href={`/blog/${slug}`}>{title}</a>
      </h2>
      <p className="flex-1 text-justify font-light text-gray-500 dark:text-gray-400">{brief}</p>
      <div className="flex flex-none items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {/* {getFormattedDate(publishedAt)} - {views} Vues - {readTimeInMinutes} min */}
        </span>
        <a href={`/blog/${slug}`} className="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline">
          Lire
          <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </article>
  )
}

{
  /* <a href={`/blog/${slug}`} aria-label="Article">
  <div class={CARD()}>
    <div class={CARD_HEADER()}>
      <h2 class={CARD_TITLE()}>{title}</h2>
      <div class={CARD_DESCRIPTION({class: "flex items-center justify-between flex-wrap gap-1"})}>
        <span>{getFormattedDate(publishedAt)} - {views} Vues - {readTimeInMinutes} min</span>
        <div class="flex items-center gap-1">{tags.map((tag) => <TagBadge data={tag} />)}</div>
      </div>
    </div>
    <div class={CARD_CONTENT({class: "flex flex-col gap-4"})}>
      <Image class="w-full rounded-lg shadow-xl" src={coverImage} alt={title} inferSize={true} transition:name={"hero:" + coverImage} />
      <p class="text-lg">{brief}</p>
    </div>
  </div>
</a>  */
}

// TYPES ***********************************************************************************************************************************
interface Props {
  data: FragmentOf<typeof PostCardFragment>
}
