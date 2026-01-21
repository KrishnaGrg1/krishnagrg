import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SkillCategory = "all" | "frontend" | "backend" | "tools" | "languages";

interface Skill {
  name: string;
  icon: string;
  category: Exclude<SkillCategory, "all">; // all categories except "all"
}

const skills: Skill[] = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "frontend",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "languages",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "languages",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "backend",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "backend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "backend",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "tools",
  },
];

const filters: SkillCategory[] = [
  "all",
  "frontend",
  "backend",
  "languages",
  "tools",
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    skillsRef.current.forEach((skillRef) => {
      if (skillRef) {
        observer.observe(skillRef);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      skillsRef.current.forEach((skillRef) => {
        if (skillRef) {
          observer.unobserve(skillRef);
        }
      });
    };
  }, []);

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 md:py-32 bg-secondary/50 dark:bg-navy-light/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-teal font-mono">03.</span> Skills & Technologies
          <div className="h-px bg-border flex-grow ml-4"></div>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full font-medium transition-colors",
                activeFilter === filter
                  ? "bg-teal text-navy"
                  : "bg-secondary text-foreground hover:bg-secondary/80",
              )}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillsRef.current[index] = el)}
              className={cn(
                "opacity-100 bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-default",
                `animation-delay-${(index % 5) * 100}`,
              )}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className={cn(
                  "w-12 h-12 mx-auto mb-3 object-contain",
                  (skill.name === "Next.js" || skill.name === "Express") &&
                    "dark:invert",
                )}
              />
              <h3 className="font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
