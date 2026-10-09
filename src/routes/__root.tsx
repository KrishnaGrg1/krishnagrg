import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import appCss from "../styles.css?url"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ModeToggle } from "@/components/ui/mode-toggle"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Krishna Bahadur Gurung - Full Stack Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Krishna Bahadur Gurung, a full stack developer from Pokhara, Nepal building React, TanStack, Go, and TypeScript products.",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div className="min-h-screen">
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                  to="/"
                  className="hidden font-semibold tracking-tight sm:block"
                >
                  Krishna Gurung
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                  <Link
                    to="/"
                    className="transition-colors hover:text-foreground/70"
                    activeProps={{
                      className: "text-foreground",
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/projects"
                    className="transition-colors hover:text-foreground/70"
                    activeProps={{
                      className: "text-foreground",
                    }}
                  >
                    Projects
                  </Link>

                  <Link
                    to="/work"
                    className="transition-colors hover:text-foreground/70"
                    activeProps={{
                      className: "text-foreground",
                    }}
                  >
                    Work
                  </Link>

                  <Link
                    to="/blog"
                    className="transition-colors hover:text-foreground/70"
                    activeProps={{
                      className: "text-foreground",
                    }}
                  >
                    Writing
                  </Link>
                  <Link
                    to="/resume"
                    className="transition-colors hover:text-foreground/70"
                    activeProps={{
                      className: "text-foreground",
                    }}
                  >
                    Resume
                  </Link>
                  <ModeToggle />
                </nav>
              </div>
            </header>

            <main>{children}</main>

            <footer className="border-t">
              <div className="container mx-auto flex flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Krishna Bahadur Gurung</p>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/KrishnaGrg1"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    GitHub
                  </a>

                  <a
                    href="https://linkedin.com/in/krishna-bahadur-gurung-60933a2a6"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    LinkedIn
                  </a>

                  <a
                    href="mailto:gkrishnabahadur618@gmail.com"
                    className="hover:text-foreground"
                  >
                    Email
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  )
}
