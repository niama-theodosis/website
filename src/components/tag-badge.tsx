import {graphql, readFragment, type FragmentOf} from "@/lib/hashnode/graphql"
import Link from "next/link"
import {BADGE} from "./ui/badge"

// GQL *************************************************************************************************************************************
export const TagBadgeFragment = graphql(`
  fragment TagBadge on Tag {
    name
    slug
  }
`)

// MAIN ************************************************************************************************************************************
export default function TagBadge({data}: TagBadgeProps) {
  const {name, slug} = readFragment(TagBadgeFragment, data)
  return (
    <Link href={`/blog/tags/${slug}`} className={BADGE()}>
      {name}
    </Link>
  )
}

// TYPES ***********************************************************************************************************************************
export type TagBadgeProps = {data: FragmentOf<typeof TagBadgeFragment>}
