import type { Photo } from "#/data/travel"
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react"
import { useCallback, useEffect } from "react"

function Lightbox({
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
