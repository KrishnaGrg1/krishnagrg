import type { ReactNode } from "react"

interface SectionProps {
  title: string
  children: ReactNode
  id?: string
}

export function Section({ title, children, id }: SectionProps) {
  return (
    <section id={id}>
      <h2 className="mb-6 text-sm font-medium text-[var(--p-muted)]">
        {title}
      </h2>

      {children}
    </section>
  )
}
