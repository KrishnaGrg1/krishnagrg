export interface Project {
  title: string
  status: "Live" | "In progress"
  href: string
  github?: string
  description: string
  details: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "Slack Clone",
    status: "In progress",
    href: "https://github.com/KrishnaGrg1/slack-clone",
    description:
      "Real-time collaboration platform inspired by Slack with messaging, WebSockets, huddles, recording and AI transcription.",
    details:
      "The project explores real-time messaging, WebSocket signaling, WebRTC peer connections, ICE negotiation, STUN/TURN, browser recording, speech-to-text and AI-generated huddle summaries.",
    tags: [
      "Go",
      "Chi",
      "PostgreSQL",
      "Redis",
      "WebSocket",
      "WebRTC",
      "whisper.cpp",
      "Tanstack-Start",
    ],
  },
  {
    title: "Pulseway",
    status: "Live",
    href: "https://pulseway.krishnabgurung.com.np",
    description:
      "Uptime monitoring platform for continuously checking services and reporting failures.",
    details:
      "Built with a Go backend, PostgreSQL, Redis, RabbitMQ, SSE, scheduled health checks, Docker and CI/CD. The system performs periodic checks and delivers real-time status updates.",
    tags: ["TanStack-Start", "Go", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
  },

  {
    title: "Banau",
    status: "Live",
    href: "https://banau-frontend.vercel.app",
    description:
      "Multi-tenant SaaS website builder designed for Nepali small businesses.",
    details:
      "Supports tenant provisioning, subdomain isolation, dynamic branding, RBAC and a separate storefront for each business.",
    tags: ["TanStack-Start", "NestJS", "Prisma", "PostgreSQL", "Redis"],
  },

  {
    title: "LevelUp",
    status: "Live",
    href: "https://level-up-olive-gamma.vercel.app",
    description:
      "Turns daily habits into AI-generated quests with progress tracking.",
    details:
      "A full-stack application combining habit tracking with AI-generated challenges and progress management.",
    tags: ["Next.js", "Express", "Prisma", "OpenAI SDK"],
  },

  {
    title: "Personal Blog",
    status: "Live",
    href: "https://blog-ecru-seven.vercel.app",
    description:
      "Personal blog with SSR, SEO, authentication and media management.",
    details:
      "Built with Next.js and Prisma, using BetterAuth for sessions and Cloudinary for media.",
    tags: ["Next.js", "Prisma", "BetterAuth", "Cloudinary"],
  },
]
