import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { blogPosts } from "../../data/blog"

export const Route = createFileRoute("/blog/$slug")({
  // Only return plain, serializable data from the loader.
  // `post.content` is a React element, and TanStack Start can't serialize
  // that when it sends loader data from the server to the client.
  loader: ({ params }) => {
    const exists = blogPosts.some((item) => item.slug === params.slug)

    if (!exists) {
      throw notFound()
    }

    return { slug: params.slug }
  },

  head: ({ params }) => {
    const post = blogPosts.find((item) => item.slug === params.slug)

    return {
      meta: [
        { title: post ? `${post.title} - Krishna Gurung` : "Writing" },
        ...(post ? [{ name: "description", content: post.description }] : []),
      ],
    }
  },

  component: BlogPostPage,
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) return null

  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
      <article>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--p-muted)] transition hover:text-[var(--p-ink)]"
        >
          <ArrowLeftIcon className="size-3" />
          All writing
        </Link>

        <header className="mt-10 border-b border-[var(--p-rule)] pb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--p-muted)]">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--p-muted)]">
            {post.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--p-muted)]">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="prose-custom mt-10 max-w-none text-sm leading-7">
          {post.content}
        </div>

        <footer className="mt-12 border-t border-[var(--p-rule)] pt-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--p-rule)] px-4 py-2 text-sm text-[var(--p-muted)] transition hover:border-[var(--p-ink)] hover:text-[var(--p-ink)]"
          >
            <ArrowLeftIcon className="size-3" />
            All writing
          </Link>
        </footer>
      </article>
    </main>
  )
}
