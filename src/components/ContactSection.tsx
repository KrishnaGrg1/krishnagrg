import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, ExternalLink, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Section, SectionHeader } from "@/components/common";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (leftRef.current) leftRef.current.classList.add("animate-fade-in-up");
            if (rightRef.current) rightRef.current.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
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

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    try {
      const formData = new FormData();
      formData.append("access_key", import.meta.env.VITE_API_KEY);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Section ref={sectionRef} id="contact" className="bg-secondary/30 dark:bg-navy-light/20">
      <SectionHeader number="06." title="Get In Touch" />
      <div className="grid md:grid-cols-2 gap-12">
        <div ref={leftRef} className="opacity-0 group">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            Let's Connect
            <span className="ml-2 text-teal transform translate-x-0 group-hover:translate-x-2 transition-transform">
              <ArrowRight size={20} />
            </span>
          </h3>
          <p className="text-muted-foreground mb-8">
            I'm currently looking for new opportunities. Whether you have a question, a project idea,
            or just want to say hi, I'll do my best to get back to you as soon as possible!
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
                <p className="text-muted-foreground">Pokhara, Nepal</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-teal text-teal hover:bg-teal/10" asChild>
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

        <div ref={rightRef} className="opacity-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Hello, I'd like to talk about..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="brand" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    Sending...
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          </Form>
        </div>
      </div>
    </Section>
  );
}
