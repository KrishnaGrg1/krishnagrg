import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@phosphor-icons/react"
import type { Photo, Trek } from "#/data/travel"

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Full-width hero used on both /travel and /travel/$slug.
 * Shows the hero video (or the first photo) with the title overlaid.
 */
export function TrekHero({
  trek,
  priority = false,
  compact = false,
  showNote = true,
  headingLevel = 2,
  onOpenPhoto,
  actions,
}: {
  trek: Trek
  priority?: boolean
  /** Shorter hero, used on the detail page. */
  compact?: boolean
  showNote?: boolean
  headingLevel?: 1 | 2
  onOpenPhoto: (index: number) => void
  /** Buttons / links rendered at the bottom right. */
  actions?: ReactNode
}) {
  const video = trek.video?.[0]
  const main = video ? undefined : trek.photos[0]
  const Heading = headingLevel === 1 ? "h1" : "h2"

  const meta = [trek.region, trek.altitude, trek.year]
    .filter(Boolean)
    .join(" · ")

  return (
    <div
      className={`relative overflow-hidden bg-[var(--p-panel)] ${
        compact
          ? "h-[56vh] max-h-[560px] min-h-[380px]"
          : "h-[68vh] max-h-[680px] min-h-[460px]"
      }`}
    >
      {video ? (
        <HeroVideo video={video} title={trek.title} priority={priority} />
      ) : main ? (
        <HeroPhoto
          photo={main}
          priority={priority}
          onClick={() => onOpenPhoto(0)}
        />
      ) : null}

      {/* Readability gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-white">
            <p className="text-xs tracking-wide text-white/70 uppercase">
              {meta}
            </p>

            <Heading className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              {trek.title}
            </Heading>

            {showNote ? (
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/85 sm:line-clamp-none">
                {trek.note}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            {trek.facts?.length ? (
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {trek.facts.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs text-white/90 backdrop-blur"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            ) : null}

            {actions ? (
              <div className="pointer-events-auto flex flex-wrap gap-2">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroPhoto({
  photo,
  priority,
  onClick,
}: {
  photo: Photo
  priority: boolean
  onClick: () => void
}) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-0 block"
      aria-label={`Open photo: ${photo.alt}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </button>
  )
}

/**
 * Muted, looping hero video. It only plays while it's on screen, and
 * not at all if the visitor prefers reduced motion (the poster shows instead).
 */
function HeroVideo({
  video,
  title,
  priority,
}: {
  video: { src: string; poster?: string }
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

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster || undefined}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={`${title} video`}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Photo tile                                                                */
/* -------------------------------------------------------------------------- */

/** Grid tile. If the image fails to load, the tile hides itself. */
export function PhotoTile({
  photo,
  onClick,
  className = "",
  overflow = 0,
}: {
  photo: Photo
  onClick: () => void
  /** Sizing classes from the parent, e.g. "aspect-[4/3]". */
  className?: string
  /** When > 0, shows a "+N" overlay (used on the last tile of a grid). */
  overflow?: number
}) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-md bg-[var(--p-panel)] focus-visible:ring-2 focus-visible:ring-[var(--p-accent)] focus-visible:outline-none ${className}`}
      aria-label={`Open photo: ${photo.alt}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      {overflow > 0 ? (
        <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg text-white">
          +{overflow}
        </span>
      ) : null}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                  */
/* -------------------------------------------------------------------------- */

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

/**
 * A normal video with controls, for the "Videos" section of a trek page.
 * (The silent looping hero clip is a different component.)
 *
 * Works for landscape and portrait phone videos: the frame is always 16:9
 * and the video is letterboxed inside it, never cropped.
 */
export function VideoPlayer({
  video,
}: {
  video: { src: string; poster?: string; title?: string }
}) {
  return (
    <figure>
      <video
        src={video.src}
        poster={video.poster || undefined}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-md bg-black object-contain"
      />

      {video.title ? (
        <figcaption className="mt-2 text-xs text-[var(--p-muted)]">
          {video.title}
        </figcaption>
      ) : null}
    </figure>
  )
}
