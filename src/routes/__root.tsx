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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Work", to: "/work" },
  { label: "Writing", to: "/blog" },
  { label: "Travel", to: "/travel" },
  { label: "Resume", to: "/resume" },
] as const
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

                <nav className="hidden items-center gap-6 text-sm md:flex">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="transition-colors hover:text-foreground/70"
                      activeProps={{ className: "text-foreground" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <ModeToggle />
                </nav>

                {/* Mobile navigation */}
                <div className="ml-auto md:hidden">
                  <Sheet>
                    <SheetTrigger
                      className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
                      aria-label="Open navigation menu"
                    >
                      <Menu className="size-5" />
                    </SheetTrigger>

                    {/* 2. Add `p-6` or `px-6 py-6` to ensure proper internal spacing inside the drawer */}
                    <SheetContent side="right" className="w-[280px] p-6">
                      <SheetHeader>
                        <SheetTitle>Krishna Gurung</SheetTitle>
                      </SheetHeader>

                      <nav className="mt-8 flex flex-col gap-5">
                        {navItems.map((item) => (
                          <SheetClose asChild key={item.to}>
                            <Link
                              to={item.to}
                              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                              activeProps={{
                                className: "font-medium text-foreground",
                              }}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}

                        <div className="border-t pt-4">
                          <ModeToggle />
                        </div>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
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
