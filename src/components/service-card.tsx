import {MeetingButton} from "@/components/meeting-button"
import {MoreButton} from "@/components/more-button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import type {Service} from "@/lib/schemas"
import {getServiceColor} from "@/lib/utils"
import Image from "next/image"

// SERVICES ********************************************************************************************************************************
export default function ServiceCard({service: {excerpt, image, name, slug, uri}}: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-4">
        <Image src={image.url} alt={name} width={1024} height={1024} className="aspect-video rounded-2xl object-cover" />
      </CardHeader>
      <CardContent className="flex-1 space-y-4 p-4 text-center">
        <h3 className="font-heading text-lg font-bold">{name}</h3>
        <p className="flex-1 text-gray-500">{excerpt}</p>
      </CardContent>
      <CardFooter className="gap-1 p-4">
        <MeetingButton service={slug} size="icon" />
        <MoreButton href={uri} color={getServiceColor(slug)} className="flex-1" />
      </CardFooter>
    </Card>
  )
}

// TYPES ***********************************************************************************************************************************
export type ServiceCardProps = {service: Service}
