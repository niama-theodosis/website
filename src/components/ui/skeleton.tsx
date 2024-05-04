import {cn} from "@/lib/utils"

// ROOT ************************************************************************************************************************************
export function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}
