import { useCallback, useEffect, useRef, useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@phosphor-icons/react"
import { treks } from "#/data/travel"
import type { Photo, Trek } from "#/data/travel"

export const Route = createFileRoute("/travel/")({
  head: () => ({
    meta: [
      { title: "Travel - Krishna Gurung" },
      {
        name: "description",
        content:
          "Photos from treks across the Annapurna region of Nepal, including Annapurna Base Camp, Mardi Himal, Khopra Danda and Poon Hill.",
      },
    ],
  }),
  component: TravelPage,
})

export interface OpenState {
  photos: Photo[]
  index: number
}

function TravelPage() {
  const [open, setOpen] = useState<OpenState | null>(null)

  return (
    <main className="pb-24">
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-16">
        <p className="text-sm text-[var(--p-muted)]">Travel</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-4xl">
          Places I've walked.
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[var(--p-muted)]">
          When I'm not at a keyboard, I'm usually on a trail. These are the
          treks I've done around the Annapurna region, with photos from each.
        </p>
      </div>

      <div>
        {treks.map((trek, index) => (
          <TrekFeature
            key={trek.slug}
            trek={trek}
            priority={index === 0}
            onOpen={(photoIndex) =>
              setOpen({ photos: trek.photos, index: photoIndex })
            }
          />
        ))}
      </div>

      {/* {open ? (
        <Lightbox
          photos={open.photos}
          index={open.index}
          onChange={(index) => setOpen({ photos: open.photos, index })}
          onClose={() => setOpen(null)}
        />
      ) : null} */}
    </main>
  )
}

/**
 * One trek: text on the left, the main photo (photos[0]) on the right,
 * then a horizontally scrolling strip with the rest of the photos.
 */
function TrekFeature({
  trek,
  priority,
  onOpen,
}: {
  trek: Trek
  priority: boolean
  onOpen: (photoIndex: number) => void
}) {
  // With a hero video, every photo goes in the strip.
  // Without one, the first photo is the hero and the rest go in the strip.
  const hasVideo = Boolean(trek.video)
  const main = hasVideo ? undefined : trek.photos[0]
  const strip = hasVideo ? trek.photos : trek.photos.slice(1)
  const stripOffset = hasVideo ? 0 : 1
  const meta = [trek.region, trek.altitude, trek.year]
    .filter(Boolean)
    .join(" · ")
  const hasStory = Boolean(trek.content || trek.itinerary?.length)
  return (
    <section id={trek.slug} className="border-t border-[var(--p-rule)]">
      <div className="grid lg:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:py-16">
          <p className="text-xs tracking-wide text-[var(--p-muted)] uppercase">
            {meta}
          </p>

          <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-tight text-[var(--p-ink)] sm:text-5xl">
            {trek.title}
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7">{trek.note}</p>

          {trek.photos.length > 0 ? (
            <button
              type="button"
              onClick={() => onOpen(0)}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--p-rule)] px-4 py-2 text-sm text-[var(--p-muted)] transition hover:border-[var(--p-ink)] hover:text-[var(--p-ink)]"
            >
              View {trek.photos.length}{" "}
              {trek.photos.length === 1 ? "photo" : "photos"}
              <ArrowRightIcon className="size-3" />
            </button>
          ) : null}
          {hasStory ? (
            <Link
              to="/travel/$slug"
              params={{ slug: trek.slug }}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--p-rule)] px-4 py-2 text-sm text-[var(--p-muted)] transition hover:border-[var(--p-ink)] hover:text-[var(--p-ink)]"
            >
              Read the story
              <ArrowRightIcon className="size-3" />
            </Link>
          ) : null}
        </div>

        {/* Main media */}
        {trek.video ? (
          <HeroVideo
            video={trek.video[0]}
            title={trek.title}
            priority={priority}
          />
        ) : main ? (
          <button
            type="button"
            onClick={() => onOpen(0)}
            className="group relative block min-h-[320px] overflow-hidden bg-[var(--p-panel)] focus-visible:ring-2 focus-visible:ring-[var(--p-accent)] focus-visible:outline-none lg:min-h-[480px]"
            aria-label={`Open photo: ${main.alt}`}
          >
            <img
              src={main.src}
              alt={main.alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ) : (
          <div className="flex min-h-[240px] items-center justify-center bg-[var(--p-panel)] text-sm text-[var(--p-muted)] lg:min-h-[480px]">
            Photos coming soon.
          </div>
        )}
      </div>
      {/* Strip of the remaining photos */}

      {strip.length > 0 ? (
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-px overflow-x-auto border-t border-[var(--p-rule)] bg-[var(--p-rule)]">
          {strip.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => onOpen(i + stripOffset)}
              className="group relative aspect-[3/4] w-1/2 shrink-0 snap-start overflow-hidden bg-[var(--p-panel)] sm:w-1/3 md:w-1/4 lg:w-[14.2857%]"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}

/**
 * Muted, looping hero video. It only plays while it's on screen, and
 * not at all if the visitor prefers reduced motion (the poster shows instead).
 */
export function HeroVideo({
  video,
  title,
  priority,
}: {
  video: { src: string; poster: string }
  title: string
  priority: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduceMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  console.log("video", video)
  return (
    <div className="relative min-h-[320px] overflow-hidden bg-[var(--p-panel)] lg:min-h-[480px]">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={`${title} video`}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

export function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const photo = photos[index]

  const prev = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onChange]
  )
  const next = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, photos.length, onChange]
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") prev()
      if (event.key === "ArrowRight") next()
    }

    window.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, prev, next])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full p-2 text-white/80 hover:text-white"
        aria-label="Close"
      >
        <XIcon className="size-5" />
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              prev()
            }}
            className="absolute left-3 rounded-full p-2 text-white/80 hover:text-white"
            aria-label="Previous photo"
          >
            <ArrowLeftIcon className="size-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              next()
            }}
            className="absolute right-3 rounded-full p-2 text-white/80 hover:text-white"
            aria-label="Next photo"
          >
            <ArrowRightIcon className="size-6" />
          </button>
        </>
      ) : null}

      <figure
        className="max-h-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[80vh] w-auto rounded-md object-contain"
        />

        <figcaption className="mt-3 text-center text-xs text-white/70">
          {photo.caption ? `${photo.caption} · ` : ""}
          {index + 1} / {photos.length}
        </figcaption>
      </figure>
    </div>
  )
}
