import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react"
import { Section } from "../components/section"
import { projects } from "../data/projects"
import { blogPosts } from "../data/blog"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  const selectedProjects = projects.slice(0, 3)
  const selectedPosts = blogPosts.slice(0, 3)

  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      {/* Hero */}
      <section>
        <p className="text-sm text-[var(--p-muted)]">
          Full-stack product engineer
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-5xl">
          I build web products and the systems behind them.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--p-muted)]">
          I work across frontend, backend and infrastructure, with a particular
          interest in real-time systems, distributed applications and
          developer-focused products.
        </p>

        <p className="mt-4 text-sm text-[var(--p-muted)]">
          Based in Pokhara, Nepal.
        </p>

        <div className="mt-7 flex gap-5 text-sm">
          <a
            href="mailto:gkrishnabahadur618@gmail.com"
            className="text-[var(--p-ink)] underline underline-offset-4"
          >
            Email
          </a>

          {/* <a
            href="/resume"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--p-ink)] underline underline-offset-4"
          >
            Resume
          </a> */}

          <a
            href="https://github.com/KrishnaGrg1"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--p-muted)] underline underline-offset-4"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/krishna-bahadur-gurung-60933a2a6"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--p-muted)] underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* About */}
      <div className="mt-24">
        <Section title="About">
          <div className="space-y-4 leading-7">
            <p>
              Love to build cool stuff, working across the stack from PostgreSQL
              schemas and backend APIs to React interfaces and cloud
              infrastructure.
            </p>

            <p>
              I've interned at two companies, participated in a U.S.-Nepal
              technology hackathon, and built and deployed several full-stack
              products independently.
            </p>

            <p>
              I'm particularly interested in understanding how systems work
              underneath the abstractions I use.
            </p>

            <p className="text-[var(--p-muted)]">
              BCA · LA Grandee International College · 2022–2026
            </p>
          </div>
        </Section>
      </div>

      {/* Selected Projects */}
      <div className="mt-24">
        <Section title="Selected projects">
          <div className="space-y-8">
            {selectedProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-[var(--p-ink)] group-hover:underline group-hover:underline-offset-4">
                    {project.title}
                  </h3>

                  <span className="text-xs text-[var(--p-muted)]">
                    {project.status}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6">{project.description}</p>

                <p className="mt-2 text-xs text-[var(--p-muted)]">
                  {project.tags.join(" · ")}
                </p>
              </a>
            ))}
          </div>

          <Link
            to="/projects"
            className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--p-muted)] hover:text-[var(--p-ink)]"
          >
            View all projects
            <ArrowRightIcon className="size-3" />
          </Link>
        </Section>
      </div>

      {/* Writing */}
      <div className="mt-24">
        <Section title="Writing">
          <div className="space-y-8">
            {selectedPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <div className="text-xs text-[var(--p-muted)]">
                  {post.date} · {post.readTime}
                </div>

                <h3 className="mt-2 font-medium text-[var(--p-ink)] group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h3>

                <p className="mt-1 text-sm leading-6">{post.description}</p>
              </Link>
            ))}
          </div>

          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 text-sm text-[var(--p-muted)] hover:text-[var(--p-ink)]"
          >
            Read all writing
            <ArrowRightIcon className="size-3" />
          </Link>
        </Section>
      </div>

      {/* Contact */}
      <div className="mt-24">
        <Section title="Contact">
          <p className="max-w-xl text-sm leading-6 text-[var(--p-muted)]">
            For product discussions, collaboration, engineering opportunities or
            just interesting technical conversations.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <a
              href="mailto:gkrishnabahadur618@gmail.com"
              className="flex items-center gap-2 text-[var(--p-ink)] underline underline-offset-4"
            >
              gkrishnabahadur618@gmail.com
              <ArrowUpRightIcon className="size-3" />
            </a>

            <a
              href="https://github.com/KrishnaGrg1"
              target="_blank"
              rel="noreferrer"
              className="block text-[var(--p-muted)] underline underline-offset-4"
            >
              github.com/KrishnaGrg1
            </a>

            <a
              href="https://linkedin.com/in/krishna-bahadur-gurung-60933a2a6"
              target="_blank"
              rel="noreferrer"
              className="block text-[var(--p-muted)] underline underline-offset-4"
            >
              linkedin.com/in/krishna-bahadur-gurung-60933a2a6
            </a>
          </div>
        </Section>
      </div>
    </main>
  )
}
