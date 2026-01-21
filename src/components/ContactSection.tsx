import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, ExternalLink, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import.meta.env.VITE_API_KEY;
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 bg-secondary/30 dark:bg-navy-light/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-teal font-mono">05.</span> Get In Touch
          <div className="h-px bg-border flex-grow ml-4"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-fade-in group">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              Let's Connect
              <span className="ml-2 text-teal transform translate-x-0 group-hover:translate-x-2 transition-transform">
                <ArrowRight size={20} />
              </span>
            </h3>

            <p className="text-muted-foreground mb-8">
              I'm currently looking for new opportunities. Whether you have a
              question, a project idea, or just want to say hi, I'll do my best
              to get back to you as soon as possible!
            </p>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
                <Mail className="text-teal mt-1" size={22} />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:gkrishnabahadur618@gmail.com"
                    className="text-muted-foreground hover:text-teal transition-colors flex items-center gap-1"
                  >
                    gkrishnabahadur618@gmail.com
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover:shadow-md transition-shadow">
                <MapPin className="text-teal mt-1" size={22} />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Pokhara,Nepal</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-teal text-teal hover:bg-teal/10"
              asChild
            >
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Call
                <ExternalLink className="ml-2" size={16} />
              </a>
            </Button>
          </div>

          <div className="opacity-0 animate-fade-in group">
            {/* <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-card p-6 rounded-lg shadow-sm"
            > */}
            <form
              action="https://api.web3forms.com/submit"
              className="space-y-6 bg-card p-6 rounded-lg shadow-sm"
              method="POST"
              data-form
            >
              <input
                type="hidden"
                name="access_key"
                value={import.meta.env.VITE_API_KEY}
              />
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={cn(
                      "block font-medium transition-colors duration-200",
                      focusedField === "name" ? "text-teal" : "",
                    )}
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="border-border focus:border-teal focus-visible:ring-teal"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={cn(
                      "block font-medium transition-colors duration-200",
                      focusedField === "email" ? "text-teal" : "",
                    )}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="border-border focus:border-teal focus-visible:ring-teal"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className={cn(
                    "block font-medium transition-colors duration-200",
                    focusedField === "subject" ? "text-teal" : "",
                  )}
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  className="border-border focus:border-teal focus-visible:ring-teal"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className={cn(
                    "block font-medium transition-colors duration-200",
                    focusedField === "message" ? "text-teal" : "",
                  )}
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello, I'd like to talk about..."
                  rows={6}
                  required
                  className="border-border focus:border-teal focus-visible:ring-teal"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-teal text-navy hover:bg-teal-dark transition-all hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    Sending...
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send size={16} />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
