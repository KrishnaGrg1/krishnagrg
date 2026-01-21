import { useEffect, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with React, Next.js, and Tailwind CSS. Features include smooth animations, dark mode, and responsive design.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/KrishnaGrg1/Personal-Portfolio",
    demo: "https://krishna-portfolio-sand.vercel.app/",
    image: "/Portfolio.png",
  },
  {
    title: "LevelUp",
    description:
      "LevelUp is a modern, multi-language SaaS starter built with Next.js 15, React 19, TypeScript, and Tailwind CSS. ",
    tags: ["Next.js", "Tailwind CSS", "Shadcn Ui", "Tanstack", "Zustand"],
    github: "https://github.com/KrishnaGrg1/LevelUp",
    demo: "https://www.melevelup.me/",
    image: "/levelup.png",
  },
  {
    title: "KanBanBoard",
    description:
      "Build a simple Kanban board using Next.js,Shadcn Ui, Tailwind CSS,Supabase.",
    tags: ["Next.js", "Tailwind CSS", "Shadcn Ui", "Tanstack"],
    github: "https://github.com/KrishnaGrg1/kanbanboard",
    demo: "https://kanbanboard-lemon.vercel.app",
    image: "/kanbanboard.png",
  },
  {
    title: "PopCornBox",
    description:
      "A web application aimed at delivering a subscription-based service, where users can select various plans, manage their profiles, and securely make payments using integrated gateways like Khalti..",
    tags: ["EJs", "Node.js", "Express.js", "MongoDB", "Khalti"],
    github: "https://github.com/KrishnaGrg1/6th-Semester-Project",
    demo: "https://popcornbox.up.railway.app/",
    image: "/PopCornBox.jpg",
  },
  {
    title: "Samjhana",
    description:
      "Implemented feature to attach YouTube and Twitter links for enhanced content association.",
    tags: [
      "TypeScript",
      "React",
      "NodeJs",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    github: "https://github.com/KrishnaGrg1/Samjhana",
    demo: "#",
    image: "bg-green-500",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    projectRefs.current.forEach((projectRef) => {
      if (projectRef) {
        observer.observe(projectRef);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      projectRefs.current.forEach((projectRef) => {
        if (projectRef) {
          observer.unobserve(projectRef);
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-teal font-mono">02.</span> My Projects
          <div className="h-px bg-border flex-grow ml-4"></div>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectRefs.current[index] = el)}
              className={cn(
                "opacity-0 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col",
                `animation-delay-${index * 100}`,
              )}
            >
              {project.image.endsWith(".png") ||
              project.image.endsWith(".jpg") ||
              project.image.endsWith(".jpeg") ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className={`h-48 w-full ${project.image}`}></div>
              )}

              <div className="p-6 bg-card flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-teal transition-colors"
                      aria-label="GitHub repository"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-teal transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-teal text-navy hover:bg-teal-dark">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
