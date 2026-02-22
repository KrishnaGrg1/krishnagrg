import { useEffect, useRef } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "./common/SectionHeader";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentRef.current?.classList.add("animate-fade-in-up");
            imageRef.current?.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const techStack = [
    "JavaScript",
    "TypeScript",
    "Python",
    "SQL",
    "React",
    "Next.js",
    "TanStack Start",
    "React Native",
    "SvelteKit",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "BetterAuth",
    "JWT",
    "Cloudinary",
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
  ];

  return (
    <Section
      ref={sectionRef}
      id="about"
      className="bg-secondary/50 dark:bg-navy-light/30"
    >
      <SectionHeader number="01." title="About Me" />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div ref={contentRef} className="opacity-0">
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <p>
              Hello! I'm Krishna Bahadur Gurung, a Full Stack Developer with a
              passion for building robust, scalable, and user-friendly web
              applications. With a solid foundation in both frontend and backend
              technologies, I specialize in creating end-to-end solutions for
              SaaS products. My journey began during my BCA studies, where I
              discovered my love for coding, and I've since gained hands-on
              experience with modern stacks like React, Next.js, Node.js, and
              NestJS.
            </p>
            <p>
              I've successfully delivered projects ranging from multi-tenant
              SaaS platforms to gamified productivity apps, always focusing on
              clean code and seamless user experiences. I thrive in environments
              that challenge me to learn and adapt, whether it's implementing
              AI-driven features or optimizing database performance.
            </p>
            <p>
              Currently, I'm expanding my expertise in server-side rendering,
              authentication with BetterAuth, and cloud deployments. I'm
              actively seeking opportunities to contribute to innovative SaaS
              products and grow as a software engineer.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Tech Stack</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {techStack.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-teal">▹</span> {tech}
              </li>
            ))}
          </ul>
        </div>

        <div ref={imageRef} className="opacity-0 animation-delay-200">
          <div className="relative mx-auto max-w-sm">
            <div className="relative z-10 overflow-hidden rounded-md">
              <div className="aspect-square bg-slate-light/20 rounded-md flex items-center justify-center">
                <span className="text-5xl font-bold text-slate-light/40">
                  <img src="portfolio.jpg" alt="" />
                </span>
              </div>
              <div className="absolute inset-0 bg-teal/20 hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-teal rounded-md z-0"></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
