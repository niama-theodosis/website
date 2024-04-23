import Iframe from "@/components/ui/iframe"

// MAIN ************************************************************************************************************************************
export default function MeetingPage() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-between gap-4 pt-4">
      <Iframe src="https://zcal.co/emb/theodosis?embed=1&embedType=iframe" className="z-10 w-full flex-1" />
    </section>
  )
}
