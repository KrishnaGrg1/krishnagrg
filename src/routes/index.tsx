import { useEffect, useState, type ReactNode } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CertificateIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/")({ component: PortfolioPage })

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievement", href: "#achievements" },
  { label: "Contact", href: "#contact" },
]

const techTicker = [
  "React",
  "Next.js",
  "TanStack Start",
  "TypeScript",
  "Go",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "SvelteKit",
  "RabbitMQ",
  "Prisma ORM",
  "GitHub Actions",
  "DigitalOcean",
]

const stats = [
  { value: "2+", label: "Years experience" },
  { value: "5+", label: "Live products" },
]

const experience = [
  {
    period: "Jul 2025 - Oct 2025",
    company: "Lexflow",
    role: "Full Stack Developer Intern",
    location: "Remote",
    points: [
      "Built admin dashboards and user management panels with SvelteKit and Flask for a multi-language SaaS platform automating client onboarding and document workflows.",
      "Developed frontend modules for client-facing sites using React, TanStack Query, and Zustand for async data and state management.",
      "Integrated RESTful APIs across the stack, handling async flows, error boundaries, and loading states in complex multi-step UIs.",
    ],
    tags: [
      "SvelteKit",
      "React",
      "Flask",
      "TanStack Query",
      "Zustand",
      "REST APIs",
    ],
    proof: {
      label: "Internship certificate",
      href: "/Koulier%20intern.pdf",
      kind: "briefcase" as const,
    },
  },
  {
    period: "Apr 2025 - Jul 2025",
    company: "BrandBuilder",
    role: "Full Stack Developer Intern",
    location: "Onsite(Pokhara)",
    points: [
      "Developed cross-platform mobile applications using React Native, Express.js, and TypeScript.",
      "Built reusable UI component libraries and integrated third-party REST APIs for authentication and data services.",
    ],
    tags: ["React Native", "Express.js", "TypeScript", "REST APIs"],
  },
]

const projects = [
  {
    title: "Pulseway",
    category: "Uptime Monitoring SaaS",
    status: "Live",
    href: "https://pulseway.krishnabgurung.com.np",
    featured: true,
    description:
      "Full-stack uptime monitoring platform with a TanStack Start frontend, Go backend, RabbitMQ job queue, Caddy auto TLS, Docker builds, and GitHub Actions CI/CD on DigitalOcean.",
    tags: [
      "TanStack Start",
      "Go / Chi",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
    ],
  },
  {
    title: "LevelUp",
    category: "Gamified Productivity",
    status: "Live",
    href: "https://melevelup.me",
    description:
      "Converts daily habits into AI-generated quests with progress tracking, using Next.js, TanStack Query, Express.js, and Prisma.",
    tags: ["Next.js", "TypeScript", "Express.js", "OpenAI SDK", "Prisma"],
  },
  {
    title: "Banau",
    category: "Multi-Tenant SaaS",
    status: "In Progress",
    href: "https://banau-frontend.vercel.app",
    description:
      "Subdomain tenant isolation, dynamic theme injection, SSR-safe routing, RBAC, and tenant provisioning for a SaaS builder.",
    tags: ["TanStack Start", "NestJS", "Prisma", "PostgreSQL"],
  },
  {
    title: "Blog",
    category: "Blog Platform",
    status: "Live",
    href: "https://blog-ecru-seven.vercel.app",
    description:
      "Personal blog with SSR, SEO optimization, BetterAuth sessions, Prisma data models, and Cloudinary media delivery.",
    tags: ["Next.js", "Prisma", "BetterAuth", "Cloudinary"],
  },
]

const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Go", "Python", "SQL"],
  },
  {
    title: "Frontend",
    skills: [
      "React / Next.js",
      "TanStack Start",
      "SvelteKit",
      "React Native",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js / Express",
      "NestJS",
      "Go (Chi)",
      "Flask",
      "Prisma ORM / SQLC",
      "PostgreSQL / MongoDB",
      "Redis / RabbitMQ",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Docker / Compose",
      "GitHub Actions",
      "DigitalOcean",
      "Caddy",
      "Vercel / Render",
    ],
  },
  {
    title: "Auth & AI",
    skills: [
      "BetterAuth / JWT",
      "OpenRouter / OpenAI SDK",
      "Socket.io",
      "Cloudinary",
      "n8n",
      "Zod / React Hook Form",
    ],
  },
  {
    title: "Tools",
    skills: ["Git / GitHub", "VS Code", "Postman", "Turborepo"],
  },
]

const contactLinks = [
  {
    label: "Email",
    value: "gkrishnabahadur618@gmail.com",
    href: "mailto:gkrishnabahadur618@gmail.com",
    icon: EnvelopeSimpleIcon,
  },
  {
    label: "GitHub",
    value: "github.com/KrishnaGrg1",
    href: "https://github.com/KrishnaGrg1",
    icon: GithubLogoIcon,
  },
  {
    label: "LinkedIn",
    value: "krishna-bahadur-gurung",
    href: "https://linkedin.com/in/krishna-bahadur-gurung-60933a2a6",
    icon: LinkedinLogoIcon,
  },
]

function PortfolioPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme")
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark

    setIsDark(shouldUseDark)
    document.documentElement.classList.toggle("dark", shouldUseDark)
  }, [])

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current

      document.documentElement.classList.toggle("dark", next)
      window.localStorage.setItem("portfolio-theme", next ? "dark" : "light")

      return next
    })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--p-bg)] text-[var(--p-ink)] selection:bg-[var(--p-accent)] selection:text-[var(--p-bg)]">
      <SiteNav isDark={isDark} onToggleTheme={toggleTheme} />
      <HeroSection />
      <TechTicker />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}

function SiteNav({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean
  onToggleTheme: () => void
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--p-ink)] bg-[var(--p-bg)]/94 px-4 py-3 backdrop-blur sm:px-6 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a
          className="inline-flex items-center"
          href="#"
          aria-label="Krishna Bahadur Gurung home"
        >
          <img alt="KBG" className="size-9 object-cover" src="/favicon.png" />
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-[0.67rem] tracking-[0.18em] text-[var(--p-text)] uppercase transition hover:text-[var(--p-accent)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* <Badge
            className="hidden border-[var(--p-rule)] bg-transparent text-[var(--p-text)] sm:inline-flex"
            variant="outline"
          >
            Selected work
          </Badge> */}
          <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />
        </div>
      </nav>
    </header>
  )
}

function ThemeToggle({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean
  onToggleTheme: () => void
}) {
  return (
    <Button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-8 border-[var(--p-ink)] bg-transparent px-2.5 text-[var(--p-ink)] hover:bg-[var(--p-panel)]"
      onClick={onToggleTheme}
      type="button"
      variant="outline"
    >
      {isDark ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  )
}

function HeroSection() {
  return (
    <section
      className="relative grid min-h-screen border-b border-[var(--p-ink)] px-4 pt-24 sm:px-6 lg:px-12"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, var(--p-accent-glow), transparent 34%), linear-gradient(135deg, var(--p-bg), var(--p-panel))",
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-rows-[auto_1fr_auto]">
        <div className="grid content-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <Badge
              className="mb-6 border-[var(--p-accent-border)] bg-[var(--p-accent-soft)] text-[var(--p-accent)]"
              variant="outline"
            >
              Full-stack product engineer
            </Badge>
            <h1 className="text-[clamp(4.8rem,14vw,12rem)] leading-[0.86] font-[var(--font-display)] tracking-wide uppercase">
              Krishna
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_var(--p-ink)]">
                Bahadur
              </span>
              <br />
              Gurung
            </h1>
            <div className="mt-8 flex items-center gap-4 sm:gap-8">
              <Separator className="flex-1 bg-[var(--p-ink)]" />
              <span className="text-center text-[0.72rem] tracking-[0.22em] text-[var(--p-text)] uppercase">
                Building products people use
              </span>
            </div>
          </div>

          <Panel className="bg-[var(--p-bg)]/78">
            <CardContent className="space-y-6 p-6">
              <p className="font-serif text-base leading-8 text-[var(--p-text)] italic sm:text-lg">
                I build full-stack web products: scalable backends, precise
                frontends, and infrastructure that ships with clear product
                intent.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-10 border-[var(--p-ink)] bg-[var(--p-ink)] px-4 text-[var(--p-bg)] hover:bg-[var(--p-text)]"
                >
                  <a href="/krishna-resume.pdf" target="_blank">
                    Resume
                    <DownloadSimpleIcon className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-10 border-[var(--p-ink)] bg-transparent px-4 text-[var(--p-ink)] hover:bg-[var(--p-panel)]"
                  variant="outline"
                >
                  <a href="#projects">View projects</a>
                </Button>
              </div>
            </CardContent>
          </Panel>
        </div>

        <div className="grid border-t border-[var(--p-ink)] sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              className="border-b border-[var(--p-rule)] py-6 last:border-r-0 sm:border-r sm:border-b-0 sm:px-6 first:sm:pl-0"
              key={stat.label}
            >
              <strong className="block text-6xl leading-none font-[var(--font-display)]">
                {stat.value}
              </strong>
              <span className="mt-2 block text-[0.65rem] tracking-[0.16em] text-[var(--p-muted)] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechTicker() {
  return (
    <div
      className="overflow-hidden border-b border-[var(--p-ink)] bg-[var(--p-panel)] py-3 text-[var(--p-ink)]"
      aria-label="Technology stack"
    >
      <div className="flex w-max [animation:portfolio-ticker_26s_linear_infinite] gap-10">
        {[...techTicker, ...techTicker].map((item, index) => (
          <span
            className="flex items-center gap-10 text-[0.68rem] tracking-[0.18em] uppercase"
            key={`${item}-${index}`}
          >
            {item}
            <span className="text-[var(--p-accent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 grid grid-cols-[52px_1fr] items-baseline gap-5 border-b border-[var(--p-ink)] pb-5 sm:grid-cols-[80px_1fr]">
      <span className="text-right text-[0.65rem] tracking-[0.16em] text-[var(--p-muted)] uppercase">
        {eyebrow} /
      </span>
      <h2 className="text-5xl leading-none font-[var(--font-display)] tracking-wide uppercase sm:text-6xl">
        {title}
      </h2>
    </div>
  )
}

function AboutSection() {
  return (
    <SectionShell id="about">
      <SectionHeader eyebrow="01" title="About" />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel>
          <CardContent className="space-y-6 p-6 font-serif text-lg leading-9 text-[var(--p-text)] italic sm:p-8">
            <p>
              I'm a Full Stack Developer from Pokhara, Nepal, building
              production-ready web products since 2022. I work across the entire
              stack, from designing PostgreSQL schemas to shipping React UIs
              that feel right.
            </p>
            <p>
              I've contributed to real companies, competed in U.S.
              Embassy-backed hackathons, and deployed live infrastructure on
              DigitalOcean. I care about clean architecture, developer
              experience, and products that actually solve problems.
            </p>
            <p>
              Currently finishing a Bachelor of Computer Application at LA
              Grandee International College, graduating 2026.
            </p>
          </CardContent>
        </Panel>

        <Panel tone="muted">
          <CardContent className="divide-y divide-[var(--p-rule)] px-5">
            <InfoRow label="Location" value="Pokhara, Nepal / Remote-capable" />
            <InfoRow label="Education" value="BCA - LA Grandee / 2022-2026" />
            <InfoRow label="Contact" value="gkrishnabahadur618@gmail.com" />
            <InfoRow
              label="Focus"
              value="Full-stack product systems"
              valueClassName="text-[var(--p-accent)]"
            />
          </CardContent>
        </Panel>
      </div>
    </SectionShell>
  )
}

function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <SectionHeader eyebrow="02" title="Work" />
      <div className="grid gap-5">
        {experience.map((item, index) => (
          <Panel
            className="transition hover:bg-[var(--p-panel)]"
            key={item.company}
          >
            <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[150px_1fr_72px] lg:gap-10">
              <div className="text-xs leading-6 tracking-[0.08em] text-[var(--p-muted)] uppercase">
                {item.period}
              </div>
              <div>
                <h3 className="text-4xl leading-none font-[var(--font-display)] tracking-wider uppercase">
                  {item.company}
                </h3>
                <p className="mt-2 text-[0.7rem] tracking-[0.16em] text-[var(--p-accent)] uppercase">
                  {item.role} - {item.location}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li
                      className="border-l-2 border-[var(--p-rule)] pl-4 font-serif text-sm leading-7 text-[var(--p-text)]"
                      key={point}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <TagList tags={item.tags} />
                  {item.proof ? (
                    <ProofLink
                      href={item.proof.href}
                      kind={item.proof.kind}
                      label={item.proof.label}
                    />
                  ) : null}
                </div>
              </div>
              <div className="hidden text-right text-7xl leading-none font-[var(--font-display)] text-[var(--p-rule)] select-none lg:block">
                {String(index + 1).padStart(2, "0")}
              </div>
            </CardContent>
          </Panel>
        ))}
      </div>
    </SectionShell>
  )
}

function ProjectsSection() {
  return (
    <SectionShell id="projects">
      <SectionHeader eyebrow="03" title="Projects" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <Panel
            className={`group transition hover:bg-[var(--p-panel)] ${
              project.featured ? "md:col-span-2" : ""
            }`}
            key={project.title}
          >
            <a
              className={`grid min-h-full gap-8 p-6 sm:p-8 ${
                project.featured ? "lg:grid-cols-[1fr_0.72fr]" : ""
              }`}
              href={project.href}
              rel="noreferrer"
              target="_blank"
            >
              <CardHeader className="p-0">
                <div className="flex items-center justify-between gap-4">
                  <Badge
                    className={
                      project.status === "Live"
                        ? "border-[var(--p-green-border)] bg-[var(--p-green-soft)] text-[var(--p-green)]"
                        : "border-[var(--p-gold-border)] bg-[var(--p-gold-soft)] text-[var(--p-gold)]"
                    }
                    variant="outline"
                  >
                    {project.status}
                  </Badge>
                  <ArrowUpRightIcon className="size-5 text-[var(--p-muted)] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--p-accent)]" />
                </div>
                <CardDescription className="text-[0.65rem] tracking-[0.16em] text-[var(--p-muted)] uppercase">
                  {String(index + 1).padStart(2, "0")} - {project.category}
                </CardDescription>
                <CardTitle className="text-4xl leading-none font-[var(--font-display)] tracking-wider uppercase sm:text-5xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="max-w-3xl font-serif text-sm leading-7 text-[var(--p-text)]">
                  {project.description}
                </CardDescription>
                <TagList tags={project.tags} className="mt-3" />
              </CardHeader>
              {project.featured ? (
                <CardContent className="border border-[var(--p-rule)] bg-[var(--p-bg)] p-6 text-xs leading-8 tracking-[0.12em] text-[var(--p-muted)] uppercase">
                  <div>uptime: 99.98%</div>
                  <div>latency: 42ms</div>
                  <div>monitors: active</div>
                  <div>status: all systems go</div>
                </CardContent>
              ) : null}
            </a>
          </Panel>
        ))}
      </div>
    </SectionShell>
  )
}

function SkillsSection() {
  return (
    <SectionShell className="bg-[var(--p-panel)]" id="skills">
      <SectionHeader eyebrow="04" title="Skills" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Panel className="bg-[var(--p-panel)]" key={group.title}>
            <CardHeader className="border-b border-[var(--p-rule)] p-6">
              <CardTitle className="text-2xl font-[var(--font-display)] tracking-wider uppercase">
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-6">
              {group.skills.map((skill) => (
                <div
                  className="flex items-center gap-3 text-xs text-[var(--p-text)]"
                  key={skill}
                >
                  <span className="h-px w-4 bg-[var(--p-accent)]" />
                  {skill}
                </div>
              ))}
            </CardContent>
          </Panel>
        ))}
      </div>
    </SectionShell>
  )
}

function AchievementSection() {
  const points = [
    "Selected from ~175 applicants to participate in this hackathon series.",
    "Built Roamly, an AI-powered travel SaaS as sole backend developer, shipped in 3 days using TypeScript, Express.js, Bun, PostgreSQL, Prisma, and Socket.io.",
    "Implemented AI itinerary generation via OpenRouter, strictly grounded in verified database data to reduce hallucinations.",
    "Designed a multi-signal feed ranking algorithm using trip quality, engagement, relevance, trust, and freshness.",
  ]

  return (
    <SectionShell id="achievements">
      <SectionHeader eyebrow="05" title="Achievement" />
      <Panel>
        <CardContent className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[280px_1fr]">
          <aside>
            <span className="block text-8xl leading-none font-[var(--font-display)] tracking-wide">
              2026
            </span>
            <p className="mt-4 text-xs leading-6 tracking-[0.16em] text-[var(--p-accent)] uppercase">
              U.S. Embassy Nepal
              <br />
              Aadyanta Advisory
              <br />
              AmCham Nepal
            </p>
            <ProofLink
              className="mt-6"
              href="/code-for-impact-hackthon-certficate.pdf"
              kind="certificate"
              label="Hackathon certificate"
            />
          </aside>
          <div>
            <h3 className="text-4xl leading-none font-[var(--font-display)] tracking-wide uppercase sm:text-5xl">
              Code for Impact:
              <br />
              U.S.-Nepal Tech Innovation Hackathon
            </h3>
            <ol className="mt-8 divide-y divide-[var(--p-rule)]">
              {points.map((point, index) => (
                <li
                  className="grid grid-cols-[1.5rem_1fr] gap-4 py-4 font-serif text-sm leading-7 text-[var(--p-text)]"
                  key={point}
                >
                  <span className="font-mono text-[0.65rem] text-[var(--p-accent)]">
                    {index + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Panel>
    </SectionShell>
  )
}

function ContactSection() {
  return (
    <SectionShell id="contact">
      <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-end">
        <div>
          <span className="text-[0.65rem] tracking-[0.18em] text-[var(--p-muted)] uppercase">
            Contact
          </span>
          <h2 className="mt-4 text-[clamp(4rem,10vw,8rem)] leading-[0.9] font-[var(--font-display)] tracking-wide uppercase">
            Let's
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_var(--p-ink)]">
              Build
            </span>
            <br />
            Together
          </h2>
          <p className="mt-8 max-w-xl font-serif text-base leading-8 text-[var(--p-muted)] italic">
            For product discussions, technical collaboration, or engineering
            opportunities, reach me through the links here.
          </p>
        </div>

        <Panel>
          <CardContent className="divide-y divide-[var(--p-rule)] p-0">
            {contactLinks.map((link) => {
              const Icon = link.icon

              return (
                <a
                  className="group flex items-center gap-4 p-5 text-[var(--p-ink)] transition hover:bg-[var(--p-panel)]"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                >
                  <Icon className="size-5 text-[var(--p-muted)] transition group-hover:text-[var(--p-accent)]" />
                  <span className="w-20 text-[0.62rem] tracking-[0.18em] text-[var(--p-muted)] uppercase">
                    {link.label}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs">
                    {link.value}
                  </span>
                  <ArrowUpRightIcon className="size-4 text-[var(--p-muted)] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--p-accent)]" />
                </a>
              )
            })}
          </CardContent>
        </Panel>
      </div>
    </SectionShell>
  )
}

function SiteFooter() {
  return (
    <footer className="flex flex-col justify-between gap-3 border-t border-[var(--p-ink)] bg-[var(--p-panel)] px-4 py-6 text-[0.65rem] tracking-[0.12em] text-[var(--p-text)] uppercase sm:flex-row sm:px-6 lg:px-12">
      <span>© 2026 Krishna Bahadur Gurung</span>
      <span className="inline-flex items-center gap-2">
        <MapPinIcon className="size-4" />
        Pokhara, Nepal - Full Stack Developer
      </span>
    </footer>
  )
}

function SectionShell({
  children,
  className = "",
  id,
}: {
  children: ReactNode
  className?: string
  id: string
}) {
  return (
    <section
      className={`border-b border-[var(--p-ink)] px-4 py-20 sm:px-6 lg:px-12 ${className}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function Panel({
  children,
  className = "",
  tone = "paper",
}: {
  children: ReactNode
  className?: string
  tone?: "paper" | "muted"
}) {
  return (
    <Card
      className={`border-[var(--p-ink)] py-0 ring-0 ${
        tone === "muted" ? "bg-[var(--p-panel)]" : "bg-[var(--p-bg)]"
      } ${className}`}
    >
      {children}
    </Card>
  )
}

function InfoRow({
  label,
  value,
  valueClassName = "text-[var(--p-ink)]",
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="py-5">
      <div className="mb-2 text-[0.6rem] tracking-[0.2em] text-[var(--p-muted)] uppercase">
        {label}
      </div>
      <div className={`text-xs leading-6 ${valueClassName}`}>{value}</div>
    </div>
  )
}

function ProofLink({
  className = "",
  href,
  kind,
  label,
}: {
  className?: string
  href: string
  kind: "briefcase" | "certificate"
  label: string
}) {
  const Icon = kind === "briefcase" ? BriefcaseIcon : CertificateIcon

  return (
    <a
      className={`inline-flex h-7 items-center gap-2 border border-[var(--p-accent-border)] bg-[var(--p-accent-soft)] px-2.5 text-[0.65rem] font-medium tracking-[0.08em] text-[var(--p-accent)] uppercase transition hover:border-[var(--p-accent)] hover:bg-[var(--p-accent)] hover:text-[var(--p-bg)] ${className}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Icon className="size-3.5" />
      {label}
      <ArrowUpRightIcon className="size-3.5" />
    </a>
  )
}

function TagList({
  tags,
  className = "",
}: {
  tags: Array<string>
  className?: string
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge
          className="border-[var(--p-rule)] bg-[var(--p-panel)] px-2 py-1 text-[0.62rem] tracking-[0.08em] text-[var(--p-text)]"
          key={tag}
          variant="outline"
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
