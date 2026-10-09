import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { blogPosts } from "@/data/blog"

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
})

function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <div className="mb-16">
        <p className="text-sm text-[var(--p-muted)]">Writing</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-4xl">
          Engineering notes.
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[var(--p-muted)]">
          Things I've learned while building real-time systems, backend
          services, infrastructure and AI-powered features.
        </p>
      </div>

      <div className="space-y-10">
        {blogPosts.map((post) => (
          <article key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--p-muted)]">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mt-2 text-lg font-medium text-[var(--p-ink)] group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6">
                {post.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--p-muted)]">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--p-muted)]">
                Read article
                <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
