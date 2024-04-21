import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

// MAIN ************************************************************************************************************************************
export default function MeetingPage() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-between p-24 pt-8">
      <div className="absolute flex w-full justify-center p-[inherit]">
        <Alert className="w-auto">
          <AlertTitle>Encore quelques instants</AlertTitle>
          <AlertDescription>L&apos;agenda est en cours de chargement...</AlertDescription>
        </Alert>
      </div>
      <iframe src="https://zcal.co/emb/gbouteiller?embed=1&embedType=iframe" loading="lazy" className="z-10 w-full flex-1" />
    </section>
  )
}
