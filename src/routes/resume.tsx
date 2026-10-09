import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/resume")({
  head: () => ({ meta: [{ title: "Resume - Krishna Gurung" }] }),
  component: ResumePage,
})

function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-12 pb-24">
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold text-[var(--p-ink)]">Resume</h1>
          <a
            href="/Krishna_Gurung_CV.pdf"
            download
            className="text-sm text-[var(--p-muted)] underline underline-offset-4"
          >
            Download PDF
          </a>
        </div>
        <div>
          <p className="mt-4 max-w-xl leading-7 text-[var(--p-muted)]">
            View and download my professional resume.
          </p>
        </div>
      </div>

      <iframe
        src="/Krishna_Gurung_CV.pdf"
        title="Krishna Bahadur Gurung resume"
        className="h-[80vh] w-full rounded-lg border border-[var(--p-rule)]"
      />
    </main>
  )
}
