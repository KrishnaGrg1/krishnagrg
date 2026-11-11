import { useState } from "react"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { treks } from "#/data/travel"
import {
  Lightbox,
  PhotoTile,
  TrekHero,
  VideoPlayer,
} from "#/components/travel/travelMedia"

export const Route = createFileRoute("/travel/$slug")({
  // Return only plain, serializable data. `trek.content` is a React element,
  // and TanStack Start can't serialize that when it sends loader data from the
  // server to the client (that's the Seroval error you get on refresh).
  loader: ({ params }) => {
    const exists = treks.some((item) => item.slug === params.slug)

    if (!exists) {
      throw notFound()
    }

    return { slug: params.slug }
  },

  head: ({ params }) => {
    const trek = treks.find((item) => item.slug === params.slug)

    return {
      meta: [
        { title: trek ? `${trek.title} - Krishna Gurung` : "Travel" },
        ...(trek ? [{ name: "description", content: trek.note }] : []),
      ],
    }
  },

  component: TrekPage,
})

function TrekPage() {
  const { slug } = Route.useParams()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const index = treks.findIndex((item) => item.slug === slug)
  const trek = treks[index]

  if (!trek) return null

  const previous = index > 0 ? treks[index - 1] : undefined
  const next = index < treks.length - 1 ? treks[index + 1] : undefined
  const videos = trek.video ?? []

  return (
    <main className="pb-24">
      {/* <div className="mx-auto max-w-6xl px-6 pt-8 pb-6">
        <Link
          to="/travel"
          className="inline-flex items-center gap-2 text-sm text-[var(--p-muted)] transition hover:text-[var(--p-ink)]"
        >
          <ArrowLeftIcon className="size-3" />
          All travel
        </Link>
      </div> */}

      <TrekHero
        trek={trek}
        compact
        priority
        showNote={false}
        headingLevel={1}
        onOpenPhoto={setOpenIndex}
        actions={
          <>
            {videos.length > 0 ? (
              <a
                href="#videos"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur transition hover:border-white"
              >
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </a>
            ) : null}

            {trek.photos.length > 0 ? (
              <a
                href="#photos"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition hover:bg-white/90"
              >
                {trek.photos.length}{" "}
                {trek.photos.length === 1 ? "photo" : "photos"}
                <ArrowRightIcon className="size-3" />
              </a>
            ) : null}
          </>
        }
      />

      {/* Story */}
      <div className="mx-auto max-w-3xl px-6 pt-12">
        <p className="text-base leading-8 text-[var(--p-ink)]">{trek.note}</p>

        {trek.content ? (
          <div className="prose-custom mt-8 max-w-none text-sm leading-7">
            {trek.content}
          </div>
        ) : null}

        {trek.itinerary?.length ? (
          <section className="mt-16">
            <h2 className="text-sm font-medium text-[var(--p-muted)]">
              Itinerary
            </h2>

            <ol className="mt-6 border-l border-[var(--p-rule)]">
              {trek.itinerary.map((day) => (
                <li
                  key={day.day}
                  className="relative pb-8 pl-6 before:absolute before:top-2 before:-left-[5px] before:size-2 before:rounded-full before:bg-[var(--p-accent)] before:content-[''] last:pb-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs tracking-wide text-[var(--p-muted)] uppercase">
                      {day.day}
                    </p>

                    {day.altitude ? (
                      <span className="text-xs text-[var(--p-muted)]">
                        {day.altitude}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-1 font-medium text-[var(--p-ink)]">
                    {day.title}
                  </h3>

                  {day.detail ? (
                    <p className="mt-2 text-sm leading-7">{day.detail}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>

      {/* Videos */}
      {videos.length > 0 ? (
        <section
          id="videos"
          className="mx-auto mt-20 max-w-6xl scroll-mt-20 px-6"
        >
          <h2 className="mb-6 text-sm font-medium text-[var(--p-muted)]">
            Videos
          </h2>

          <div
            className={`grid gap-4 ${
              videos.length > 1 ? "sm:grid-cols-2" : "max-w-3xl"
            }`}
          >
            {videos.map((video) => (
              <VideoPlayer key={video.src} video={video} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Photos */}
      {trek.photos.length > 0 ? (
        <section
          id="photos"
          className="mx-auto mt-20 max-w-6xl scroll-mt-20 px-6"
        >
          <h2 className="mb-6 text-sm font-medium text-[var(--p-muted)]">
            Photos
          </h2>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {trek.photos.map((photo, i) => (
              <PhotoTile
                key={photo.src}
                photo={photo}
                className="aspect-[4/3]"
                onClick={() => setOpenIndex(i)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Previous / next trek */}
      {previous || next ? (
        <nav className="mx-auto mt-20 grid max-w-6xl gap-4 border-t border-[var(--p-rule)] px-6 pt-8 sm:grid-cols-2">
          {previous ? (
            <Link
              to="/travel/$slug"
              params={{ slug: previous.slug }}
              className="group block"
            >
              <p className="flex items-center gap-2 text-xs text-[var(--p-muted)]">
                <ArrowLeftIcon className="size-3" />
                Previous
              </p>
              <p className="mt-1 font-medium text-[var(--p-ink)] group-hover:underline group-hover:underline-offset-4">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              to="/travel/$slug"
              params={{ slug: next.slug }}
              className="group block sm:text-right"
            >
              <p className="flex items-center gap-2 text-xs text-[var(--p-muted)] sm:justify-end">
                Next
                <ArrowRightIcon className="size-3" />
              </p>
              <p className="mt-1 font-medium text-[var(--p-ink)] group-hover:underline group-hover:underline-offset-4">
                {next.title}
              </p>
            </Link>
          ) : null}
        </nav>
      ) : null}

      {openIndex !== null ? (
        <Lightbox
          photos={trek.photos}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </main>
  )
}
