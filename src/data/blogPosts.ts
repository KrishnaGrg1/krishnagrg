export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string | null;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "free-claude-code",
    title: "Free Claude Code: Using AI Coding Assistants Without API Costs",
    date: "2026-02-23T00:00:00.000Z",
    excerpt:
      "Learn how to set up and use Claude Code for free by proxying to alternative providers like NVIDIA NIM, OpenRouter, or local models via LM Studio.",
    tags: ["AI", "Developer Tools", "Tutorial", "Open Source"],
    image: null,
    content: `# Free Claude Code: Using AI Coding Assistants Without API Costs

AI coding assistants are transforming development workflows, but many require paid API access. This project offers a clever workaround by intercepting Claude Code's API calls and routing them to free or self-hosted models, letting you use the Claude Code CLI, VSCode extension, and more without an Anthropic key.

## What Problem It Solves

Claude Code is an incredible AI coding assistant that helps developers write, debug, and understand code. However, it typically requires an Anthropic API key with associated costs. For many developers—especially students, hobbyists, or those working on personal projects—these costs can be prohibitive.

The **free-claude-code** repository provides a community solution that proxies Claude Code requests to free or local providers, enabling you to:

- Use Claude Code CLI without Anthropic access
- Run models locally for complete privacy
- Leverage free API tiers from various providers

## Project Overview

At its core, free-claude-code is a proxy server that:

1. **Intercepts** Claude Code requests in the Anthropic API format
2. **Translates** them for alternative providers
3. **Streams** responses back to Claude Code

### Supported Providers

| Provider | Type | Features |
|----------|------|----------|
| **NVIDIA NIM** | Cloud | Free tier with 40 requests/min |
| **OpenRouter** | Cloud | Access to hundreds of models |
| **LM Studio** | Local | Run models offline, complete privacy |

## Installation & Setup

### Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/Alishahryar1/free-claude-code.git
cd free-claude-code
cp .env.example .env
\`\`\`

### Step 2: Configure Your Provider

Edit the \`.env\` file based on your chosen provider:

#### For NVIDIA NIM (Cloud - Free Tier)

\`\`\`bash
NVIDIA_NIM_API_KEY=nvapi-your-key-here
MODEL=nvidia_nim/llama-3.1-nemotron-70b-instruct
\`\`\`

#### For OpenRouter (Cloud - Multiple Models)

\`\`\`bash
OPENROUTER_API_KEY=sk-your-key-here
MODEL=open_router/meta-llama/llama-3.1-70b-instruct:free
\`\`\`

#### For LM Studio (Local - Offline)

\`\`\`bash
# No API key needed!
MODEL=lmstudio/your-model-name
\`\`\`

## Running the Server

Start the proxy server:

\`\`\`bash
uv run uvicorn server:app --host 0.0.0.0 --port 8082
\`\`\`

Then use Claude Code through the proxy:

\`\`\`bash
ANTHROPIC_AUTH_TOKEN=freecc \\
ANTHROPIC_BASE_URL=http://localhost:8082 \\
claude
\`\`\`

That's it! The proxy now intercepts Claude Code CLI calls, rewrites them for your chosen provider, and streams responses back—all without Anthropic API costs.

## VSCode Extension Setup

To use with the Claude Code VSCode extension:

1. Start the proxy server as shown above
2. Open VSCode Settings (JSON)
3. Add these environment variables:

\`\`\`json
"claude-code.environmentVariables": [
  { "name": "ANTHROPIC_BASE_URL", "value": "http://localhost:8082" },
  { "name": "ANTHROPIC_AUTH_TOKEN", "value": "freecc" }
]
\`\`\`

4. Reload VSCode

To revert to official Anthropic models, simply remove those environment variables.

## How It Works Internally

The architecture is elegantly simple:

\`\`\`
Claude Code CLI/VSCode
         ↓
  Free Claude Code Proxy
         ↓
  Provider (NIM / OpenRouter / LM Studio)
\`\`\`

### Key Technical Details

- **API Translation**: Converts Anthropic's message format to your provider's format
- **Streaming Support**: Maintains real-time response streaming for natural interaction
- **Token Optimization**: Reduces wasted tokens and handles thinking/tool tags correctly
- **Error Handling**: Graceful fallbacks and informative error messages

## Benefits and Limitations

### ✅ Benefits

- **No Anthropic API key required**
- **Run models locally** for complete privacy
- **Access generous free API tiers** from NVIDIA and OpenRouter
- **Works with CLI, VSCode, and Discord bot control**
- **Experiment with different models** to find what works best

### ⚠️ Limitations

- Performance depends on the provider's model capabilities
- Community-maintained, not an official Anthropic product
- May not support 100% of Claude Code features
- Local models require hardware resources

## Real-World Use Cases

### Personal Projects Without API Costs

Build your side projects with AI assistance without worrying about API bills stacking up.

### Offline Development

Use LM Studio to run models locally—perfect for sensitive codebases or when you're offline.

### Model Experimentation

Switch between providers to compare how different models handle your codebase.

### Remote Workflows

Control your AI coding assistant remotely via Discord bot integration.

## Conclusion

The free-claude-code project democratizes access to powerful AI coding tools. Whether you're a student learning to code, a hobbyist building side projects, or a professional wanting to reduce costs, this proxy solution opens up possibilities that were previously locked behind API paywalls.

The project is open-source and community-maintained, so you can contribute improvements, report issues, or customize it for your specific needs.

**Ready to get started?** Check out the [GitHub repository](https://github.com/Alishahryar1/free-claude-code) and start coding with AI today—no API key required!`,
  },
  {
    slug: "welcome",
    title: "Welcome to My Blog",
    date: "2026-02-22T00:00:00.000Z",
    excerpt:
      "Introducing my new blog where I share my thoughts on web development, SaaS, and my journey as a full-stack developer.",
    tags: ["personal", "intro"],
    image: null,
    content: `# Welcome to My Blog

Hello and welcome to my blog! I'm Krishna Bahadur Gurung, a Full Stack Developer passionate about building robust, scalable, and user-friendly web applications. I'm excited to start sharing my experiences, tutorials, and insights on full-stack development, SaaS products, and the ever-evolving world of web technologies.

## What You Can Expect

This blog is my space to share knowledge, document my learning journey, and contribute to the developer community. Here's what I'll be covering:

### Technical Tutorials

- **React & Next.js**: Deep dives into modern React patterns, server components, and the latest Next.js features
- **Node.js & Backend**: Building scalable APIs, authentication systems, and microservices
- **Database Design**: PostgreSQL optimization, MongoDB patterns, and data modeling
- **DevOps & Deployment**: CI/CD pipelines, Docker, and cloud deployments

### SaaS Development

Having worked on multiple SaaS products, I'll share insights on:

- Multi-tenant architecture patterns
- Subscription and billing integration
- Building for scale from day one
- User onboarding and experience optimization

### Career & Growth

Reflections on my journey from BCA student to full-stack developer:

- Learning strategies that worked for me
- Mistakes I made along the way
- How to stay updated in a fast-moving industry

## My Tech Stack

Here's what I work with daily:

\`\`\`
Frontend:  React, Next.js, TypeScript, Tailwind CSS
Backend:   Node.js, Express, NestJS, Python
Database:  PostgreSQL, MongoDB
Tools:     Git, Docker, VS Code, Postman
\`\`\`

## Let's Connect

I believe in learning together. If you have topics you'd like me to cover, questions about my posts, or just want to chat about tech, feel free to reach out through the contact form or connect with me on social media.

**Stay tuned for upcoming posts!** The best is yet to come.`,
  },
  {
    slug: "my-journey",
    title: "My Journey into Full-Stack Development",
    date: "2026-02-20T00:00:00.000Z",
    excerpt:
      "Reflecting on how I got started with coding and the lessons learned along the way as a full-stack developer.",
    tags: ["career", "reflection", "personal"],
    image: null,
    content: `# My Journey into Full-Stack Development

Every developer has a unique story of how they got started. Mine began during my BCA (Bachelor of Computer Applications) studies, where I discovered my love for coding. Looking back, the journey has been filled with challenges, breakthroughs, and countless hours of learning. Here's my story.

## The Beginning

I still remember writing my first "Hello World" program. It was a simple C program, but the feeling of making a computer do something I instructed was magical. That moment sparked a curiosity that would shape my entire career.

### Early Challenges

Like many beginners, I struggled with:

- **Understanding programming logic**: Loops and conditionals seemed alien at first
- **Debugging**: I spent hours looking for missing semicolons and brackets
- **Imposter syndrome**: Everyone else seemed to know so much more

But I kept going. I realized that every expert was once a beginner.

## Finding My Path

During my second year of BCA, I discovered web development. The ability to create visual, interactive experiences was captivating. I started with HTML and CSS, then moved to JavaScript—and that's when things really clicked.

### The React Revelation

When I first encountered React, it changed everything. The component-based architecture made so much sense:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

Suddenly, I could break down complex UIs into manageable, reusable pieces. This was the foundation of my frontend expertise.

## Going Full-Stack

I didn't want to be limited to just frontend development. I wanted to understand the entire picture—how data flows from the database to the user interface and back.

### Backend Learning Path

1. **Node.js**: JavaScript on the server was a game-changer
2. **Express.js**: Building REST APIs became second nature
3. **Database Design**: Understanding relational (PostgreSQL) and non-relational (MongoDB) databases
4. **Authentication**: JWT, OAuth, and security best practices

### The NestJS Chapter

Working with NestJS elevated my backend skills. Its structured approach taught me:

- Dependency injection patterns
- Module organization
- TypeScript decorators
- Building scalable microservices

## Real-World Experience

Theory is one thing, but building real projects is where true learning happens.

### Projects That Taught Me the Most

**PopCorn Box** - A subscription-based movie streaming service:
- Integrated Khalti payment gateway
- User authentication and profile management
- MongoDB for data storage
- Learned about handling sensitive payment data

**LevelUp** - A modern SaaS starter:
- Multi-language support
- Next.js 15 with React 19
- TanStack Query for data fetching
- Zustand for state management

**KanBan Board**:
- Real-time updates with Supabase
- Drag and drop functionality
- User collaboration features

## Lessons Learned

Looking back, here are the most valuable lessons I've learned:

### 1. Build, Don't Just Read

You can watch 100 tutorials, but nothing replaces actually building something. Start small, make mistakes, fix them, and iterate.

### 2. Learn to Read Documentation

Documentation is your best friend. Learning to navigate and understand official docs is a superpower.

### 3. Version Control Early

I wish I had learned Git earlier. Commit often, write meaningful commit messages, and don't be afraid to branch.

### 4. The Community Matters

Engaging with other developers through Discord, GitHub, and Twitter has been invaluable. Share your work, ask questions, and help others.

### 5. Stay Curious

Technology evolves rapidly. What's cutting-edge today might be legacy tomorrow. Stay curious and keep learning.

## Current Focus

Right now, I'm focusing on:

- **Server-side rendering** with Next.js and TanStack Start
- **Authentication systems** with BetterAuth
- **AI integration** in web applications
- **Cloud deployments** and DevOps practices

## Advice for Aspiring Developers

If you're just starting out:

1. **Pick one stack and master it** before diversifying
2. **Build projects** that solve real problems
3. **Share your journey** publicly—it opens doors
4. **Apply for jobs** even if you don't meet all requirements
5. **Never stop learning**

## What's Next

I'm currently seeking opportunities to contribute to innovative SaaS products and grow as a software engineer. The journey continues, and I'm excited about what lies ahead.

If you're on a similar path, feel free to reach out. I'd love to connect and share experiences!

---

*Remember: Every expert was once a beginner. Keep coding, keep building, keep growing.*`,
  },
];
