import { createFileRoute } from "@tanstack/react-router"
import { experience } from "../data/experience"

export const Route = createFileRoute("/work")({
  component: WorkPage,
})

function WorkPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <div className="mb-16">
        <p className="text-sm text-[var(--p-muted)]">Work</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-4xl">
          Experience.
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[var(--p-muted)]">
          Places where I've worked, what I contributed, and the engineering
          experience I've gained along the way.
        </p>
      </div>

      <section>
        <div className="space-y-12">
          {experience.map((item) => (
            <article key={item.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-lg font-medium text-[var(--p-ink)]">
                  {item.company}
                </h2>

                <span className="text-sm text-[var(--p-muted)]">
                  {item.period}
                </span>
              </div>

              <p className="mt-1 text-sm text-[var(--p-muted)]">{item.role}</p>

              <ul className="mt-4 space-y-3 text-sm leading-6">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 before:absolute before:left-0 before:content-['—']"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {item.proof ? (
                <a
                  href={item.proof.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm text-[var(--p-muted)] underline underline-offset-4 hover:text-[var(--p-ink)]"
                >
                  {item.proof.label}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--p-rule)] pt-10">
        <h2 className="text-sm font-medium text-[var(--p-muted)]">
          Achievement
        </h2>

        <article className="mt-6">
          <h3 className="font-medium text-[var(--p-ink)]">
            Code for Impact: U.S.-Nepal Tech Innovation Hackathon
          </h3>

          <p className="mt-1 text-sm text-[var(--p-muted)]">
            2026 · U.S. Embassy Nepal · Aadyanta Advisory · AmCham Nepal
          </p>

          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li>Selected from approximately 175 applicants.</li>

            <li>
              Built Roamly, an AI-powered travel SaaS, as the sole backend
              developer in three days.
            </li>

            <li>
              Implemented AI itinerary generation using OpenRouter with
              database-grounded information.
            </li>

            <li>
              Designed a multi-signal feed ranking algorithm using quality,
              engagement, relevance, trust and freshness.
            </li>
          </ul>

          <a
            href="/code-for-impact-hackthon-certficate.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-[var(--p-muted)] underline underline-offset-4"
          >
            Certificate
          </a>
        </article>
      </section>
    </main>
  )
}
