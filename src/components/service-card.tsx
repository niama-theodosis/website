import {MeetingButton} from "@/components/meeting-button"
import {MoreButton} from "@/components/more-button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import type {Service} from "@/lib/schemas"
import {getServiceColor} from "@/lib/utils"
import Image from "next/image"

// ROOT ************************************************************************************************************************************
export default function ServiceCard({service: {excerpt, image, name, slug, uri}}: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <Image src={image.url} alt={name} width={550} height={550} className="aspect-video rounded-2xl object-cover" />
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex-1 text-base">{excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <MeetingButton service={slug} size="icon" />
        <MoreButton href={uri} color={getServiceColor(slug)} className="flex-1" />
      </CardFooter>
    </Card>
  )
}
export type ServiceCardProps = {service: Service}
