import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", isRoute: true, section: "home" },
  { name: "About", href: "/#about", isRoute: false, section: "about" },
  { name: "Projects", href: "/#projects", isRoute: false, section: "projects" },
  { name: "Skills", href: "/#skills", isRoute: false, section: "skills" },
  {
    name: "Experience",
    href: "/#experience",
    isRoute: false,
    section: "experience",
  },
  {
    name: "Education",
    href: "/#education",
    isRoute: false,
    section: "education",
  },
  { name: "Blog", href: "/blog", isRoute: true, section: "blog" },
  { name: "Contact", href: "/#contact", isRoute: false, section: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position (only on home page)
      if (location.pathname === "/") {
        const sections = navLinks.map((link) => link.section);
        const sectionElements = sections.map((id) =>
          document.getElementById(id),
        );
        const scrollPosition = window.scrollY + 100;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Set active section based on current route
  useEffect(() => {
    if (
      location.pathname === "/blog" ||
      location.pathname.startsWith("/blog/")
    ) {
      setActiveSection("blog");
    } else if (location.pathname === "/") {
      const hash = location.hash.replace("#", "") || "home";
      setActiveSection(hash);
    }
  }, [location]);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.section === "blog") {
      return (
        location.pathname === "/blog" || location.pathname.startsWith("/blog/")
      );
    }
    if (location.pathname !== "/") return false;
    return activeSection === link.section;
  };

  const renderNavLink = (link: (typeof navLinks)[0]) => {
    const active = isActive(link);
    const linkClassName = `relative font-medium hover:text-teal transition-colors
      ${active ? "text-teal" : "text-foreground"}
      after:content-[''] after:absolute after:w-full after:scale-x-0 
      after:h-0.5 after:bottom-0 after:left-0 after:bg-teal 
      after:origin-bottom-right after:transition-transform after:duration-300
      hover:after:scale-x-100 hover:after:origin-bottom-left
      ${active ? "after:scale-x-100" : ""}`;

    if (link.isRoute) {
      return (
        <Link to={link.href} className={linkClassName}>
          {link.name}
        </Link>
      );
    }

    return (
      <a href={link.href} className={linkClassName}>
        {link.name}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-navy/70 glass py-2 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          <span className="flex items-center gap-2 font-heading">
            <span className="text-teal">{"<"}</span>
            Krishna
            <span className="text-teal">{"/>"}</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>{renderNavLink(link)}</li>
            ))}
          </ul>
          <ThemeSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 dark:bg-navy/95 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } pt-20`}
      >
        <nav className="h-full flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className={`text-xl font-medium transition-colors ${
                      isActive(link) ? "text-teal" : "text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={`text-xl font-medium transition-colors ${
                      isActive(link) ? "text-teal" : "text-foreground"
                    }`}
                    onClick={(e) => handleSmoothScroll(e, link.section)}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
