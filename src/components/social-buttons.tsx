import {Button} from "@/components/ui/button"
import {env} from "@/env"
import {hashnode} from "@/lib/hashnode"
import {graphql} from "@/lib/hashnode/graphql"
import {cn} from "@/lib/utils"
import {forwardRef, type HTMLAttributes} from "react"

// GQL *************************************************************************************************************************************
export const SocialsQuery = graphql(`
  query Socials($host: String!) {
    publication(host: $host) {
      author {
        socialMediaLinks {
          facebook
          instagram
          youtube
        }
      }
    }
  }
`)

// ROOT ************************************************************************************************************************************
export const SocialButtons = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(async ({className, ...props}, ref) => {
  const {publication} = await hashnode.request(SocialsQuery, {host: env.HASHNODE_PUBLICATION_HOST})

  const socials = [
    {id: "instagram", icon: "i-lucide-instagram", url: publication?.author.socialMediaLinks?.instagram},
    {id: "youtube", icon: "i-lucide-youtube", url: publication?.author.socialMediaLinks?.youtube},
    {id: "facebook", icon: "i-lucide-facebook", url: publication?.author.socialMediaLinks?.facebook},
  ]

  return (
    <div ref={ref} className={cn("flex items-center gap-1 lg:gap-2", className)} {...props}>
      {socials.map(({icon, id, url}) => (
        <Button key={id} size="icon" asChild>
          <a href={url ?? ""} target="_blank">
            <span className={cn(icon, "h-4 w-4")}></span>
          </a>
        </Button>
      ))}
    </div>
  )
})
SocialButtons.displayName = "SocialButtons"
