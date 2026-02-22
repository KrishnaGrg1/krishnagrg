import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/common";
import { format } from "date-fns";
import {
  Twitter,
  Linkedin,
  Facebook,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Sparkles,
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const url = typeof window !== "undefined" ? window.location.href : "";

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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [post]);

  if (!post)
    return (
      <Section>
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <Sparkles size={32} className="text-destructive" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Post not found</h3>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-teal hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </Section>
    );

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <Section ref={sectionRef} id="blog-post" className="min-h-screen pt-20">
      <article className="max-w-5xl mx-auto px-4">
        <div ref={contentRef} className="opacity-0">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal mb-8 transition-all group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to all articles
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-teal/10 text-teal border border-teal/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm pb-8 border-b">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-teal" />
                <time className="text-foreground font-medium">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-teal" />
                <span className="text-foreground font-medium">
                  {getReadingTime(post.content)} min read
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mb-16">
            <article
              className="
              prose prose-lg dark:prose-invert max-w-none
              
              /* Headings */
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
              
              /* Paragraphs */
              prose-p:text-foreground prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-base
              
              /* Links */
              prose-a:text-teal prose-a:no-underline prose-a:font-medium 
              hover:prose-a:underline prose-a:underline-offset-4 prose-a:decoration-2
              
              /* Lists */
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
              prose-li:text-foreground prose-li:leading-relaxed prose-li:my-2
              
              /* Strong & Emphasis */
              prose-strong:text-foreground prose-strong:font-bold
              prose-em:text-foreground/90
              
              /* Code */
              prose-code:text-teal prose-code:bg-secondary/80 
              prose-code:px-2 prose-code:py-1 prose-code:rounded-md 
              prose-code:font-mono prose-code:text-sm prose-code:font-semibold
              prose-code:before:content-[''] prose-code:after:content-['']
              
              /* Code Blocks */
              prose-pre:bg-secondary/50 prose-pre:border-2 prose-pre:border-border 
              prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8
              prose-pre:overflow-x-auto prose-pre:shadow-lg
              
              /* Blockquotes */
              prose-blockquote:border-l-4 prose-blockquote:border-teal 
              prose-blockquote:pl-6 prose-blockquote:italic 
              prose-blockquote:text-foreground/90 prose-blockquote:my-6
              prose-blockquote:bg-secondary/30 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
              
              /* Tables */
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden
              prose-thead:bg-secondary/50
              prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-foreground prose-th:border-b-2 prose-th:border-border
              prose-td:p-4 prose-td:border-t prose-td:border-border prose-td:text-foreground/90
              prose-tr:border-b prose-tr:border-border
              
              /* Images */
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8 prose-img:border prose-img:border-border
              
              /* HR */
              prose-hr:border-border prose-hr:my-12
            "
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Share Section */}
          <div className="border-t border-border pt-12 pb-16">
            <div className="bg-secondary/30 rounded-2xl p-8 border border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <Share2 size={20} className="text-teal" />
                    <span className="text-lg font-semibold">
                      Enjoyed this article?
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share it with your network
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-2 hover:bg-teal hover:text-navy hover:border-teal transition-all"
                    asChild
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={20} />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-2 hover:bg-teal hover:text-navy hover:border-teal transition-all"
                    asChild
                  >
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-2 hover:bg-teal hover:text-navy hover:border-teal transition-all"
                    asChild
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog Link */}
          <div className="text-center pb-12">
            <Link to="/blog">
              <Button
                size="lg"
                className="bg-teal text-navy hover:bg-teal/90 rounded-xl px-8 h-12 font-semibold shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 transition-all"
              >
                <ArrowLeft size={18} className="mr-2" />
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Section>
  );
}
