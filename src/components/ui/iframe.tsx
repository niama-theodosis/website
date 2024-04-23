"use client"

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {useCallback, useEffect, useRef, useState} from "react"

// MAIN ************************************************************************************************************************************
export default function Iframe({className, src}: Props) {
  const iFrameRef = useRef<HTMLIFrameElement>(null)
  const [alertShown, setAlertShown] = useState(true)

  const handleLoad = () => setAlertShown(false)
  const init = useCallback(() => {
    console.log("Yeah", iFrameRef.current)
    iFrameRef.current?.addEventListener("load", handleLoad)
    if (iFrameRef.current) iFrameRef.current.src = src
    return () => iFrameRef.current?.removeEventListener("load", handleLoad)
  }, [src])
  useEffect(() => init(), [init])

  return (
    <>
      {alertShown && (
        <div className="absolute top-32 flex w-full justify-center">
          <Alert className="w-auto">
            <AlertTitle>Encore quelques instants</AlertTitle>
            <AlertDescription>L&apos;agenda est en cours de chargement...</AlertDescription>
          </Alert>
        </div>
      )}

      <iframe ref={iFrameRef} loading="lazy" className={className} />
    </>
  )
}

// TYPES ***********************************************************************************************************************************
type Props = {className: string; src: string}
