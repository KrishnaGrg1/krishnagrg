import { createFileRoute } from "@tanstack/react-router"
import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react"
import { projects } from "../data/projects"

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <div className="mb-16">
        <p className="text-sm text-[var(--p-muted)]">Projects</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-4xl">
          Things I've built.
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[var(--p-muted)]">
          Full-stack products, backend systems, experiments and infrastructure
          I've worked on.
        </p>
      </div>

      <div className="space-y-12">
        {projects.map((project) => (
          <article key={project.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-lg font-medium text-[var(--p-ink)]">
                {project.title}
              </h2>

              <span className="text-xs text-[var(--p-muted)]">
                {project.status}
              </span>
            </div>

            <p className="mt-2 leading-7">{project.description}</p>

            <p className="mt-3 text-sm leading-6 text-[var(--p-muted)]">
              {project.details}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs text-[var(--p-muted)]">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="mt-4 flex gap-4 text-sm">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[var(--p-ink)] underline underline-offset-4"
              >
                View project
                <ArrowUpRightIcon className="size-3" />
              </a>

              {project.title === "Slack Clone" ? (
                <a
                  href="https://github.com/KrishnaGrg1/slack-clone"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--p-muted)] underline underline-offset-4"
                >
                  Source
                  <GithubLogoIcon className="size-3" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
