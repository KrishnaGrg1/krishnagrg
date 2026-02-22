import { Github, Linkedin, Mail, Twitter, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t bg-background relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal/40 via-teal to-teal/40"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Krishna Bahadur Gurung
              <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-teal"></span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              A passionate full-stack developer specializing in creating
              engaging digital experiences with modern web technologies.
            </p>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/KrishnaGrg1/"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-teal transition-all hover:scale-110 transform"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-bahadur-gurung-60933a2a6/"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-teal transition-all hover:scale-110 transform"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/krishna_ba63631"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-teal transition-all hover:scale-110 transform"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:gkrishnabahadur618@gmail.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-teal transition-all hover:scale-110 transform"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="flex items-center">
              <Globe size={16} className="text-teal mr-2" />
              <span>Pokhara, Nepal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-teal"></span>
            </h3>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Education", href: "#education" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-teal transition-colors hover:translate-x-1 transform-gpu inline-flex"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-teal"></span>
            </h3>
            <div className="space-y-2 mb-4">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-teal" />
                <a
                  href="mailto:gkrishnabahadur618@gmail.com"
                  className="hover:text-teal transition-colors"
                >
                  gkrishnabahadur618@gmail.com
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-start">
              <Button className="bg-teal text-navy hover:bg-teal-dark" asChild>
                <a href="/krishna.pdf" download="Krishna_Bahadur_Gurung_CV.pdf">
                  Download CV
                </a>
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground flex items-center">
              &copy; {currentYear} Krishna Bahadur Gurung. Made with
              <Heart size={14} className="mx-1 text-red-500 animate-pulse" />
              All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              <a href="#" className="hover:text-teal">
                Privacy Policy
              </a>
              {" • "}
              <a href="#" className="hover:text-teal">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
