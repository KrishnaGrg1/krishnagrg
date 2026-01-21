import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  website?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Lexflow",
    role: "Full Stack Developer Intern",
    location: "Pokhara, Nepal (Remote)",
    period: "July 2025 — Oct 2025",
    website: "https://lexflow.fr/en/",
    description:
      "Contributed to Lexflow, a SaaS platform enabling businesses to automate client onboarding, document workflows, and company creation with multi-language support.",
    highlights: [
      "Developed dynamic dashboards and user management systems using SvelteKit, Flask, and automation tools like n8n.",
      "Collaborated on frontend modules for company sites (e.g., koulier.lexflow.fr) built with React, leveraging Zustand and TanStack Query for state and data management.",
    ],
    technologies: [
      "SvelteKit",
      "Flask",
      "n8n",
      "React",
      "Zustand",
      "TanStack Query",
    ],
  },
  {
    company: "BrandBuilder",
    role: "Full Stack Developer Intern",
    location: "Pokhara, Nepal",
    period: "April 2025 — July 2025",
    description:
      "Developed cross-platform mobile applications using React Native, Express.js, and TypeScript.",
    highlights: [
      "Built and deployed mobile applications with focus on performance and user experience.",
      "Implemented RESTful APIs and integrated backend services for seamless data flow.",
    ],
    technologies: ["React Native", "Express.js", "TypeScript"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    experienceRefs.current.forEach((expRef) => {
      if (expRef) {
        observer.observe(expRef);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      experienceRefs.current.forEach((expRef) => {
        if (expRef) {
          observer.unobserve(expRef);
        }
      });
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 bg-secondary/50 dark:bg-navy-light/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-teal font-mono">04.</span> Experience
          <div className="h-px bg-border flex-grow ml-4"></div>
        </h2>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              ref={(el) => (experienceRefs.current[index] = el)}
              className={cn(
                "opacity-0 bg-card rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-teal/50",
                `animation-delay-${index * 200}`,
              )}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-teal mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white text-navy">
                        {experience.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xl text-teal font-semibold">
                          {experience.company}
                        </p>
                        {experience.website && (
                          <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal hover:text-teal/80 transition-colors"
                            aria-label={`Visit ${experience.company} website`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3 ml-9">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground/80 leading-relaxed mb-4 ml-9">
                {experience.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-6 ml-9">
                {experience.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex gap-3 text-foreground/80">
                    <span className="text-teal mt-1.5 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 ml-9">
                {experience.technologies.map((tech, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 bg-teal/10 text-teal text-sm rounded-full font-medium border border-teal/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
