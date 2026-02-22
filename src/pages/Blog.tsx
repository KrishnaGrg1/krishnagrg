import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/common";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Search, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const posts = blogPosts;
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    postRefs.current.forEach((postRef) => {
      if (postRef) {
        observer.observe(postRef);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      postRefs.current.forEach((postRef) => {
        if (postRef) {
          observer.unobserve(postRef);
        }
      });
    };
  }, [posts]);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <Section ref={sectionRef} id="blog" className="min-h-screen">
      <SectionHeader number="05." title="Blog" />

      {/* Hero Section */}
      <div className="mb-16 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal border border-teal/20 mb-6">
          <Sparkles size={16} />
          <span className="text-sm font-semibold">Latest Articles</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Thoughts, tutorials & insights
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Exploring ideas, sharing knowledge, and documenting my journey in
          tech. From tutorials to insights, find it all here.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-base bg-secondary/50 border-2 border-border hover:border-teal/50 focus-visible:border-teal focus-visible:ring-0 rounded-xl transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className={cn(
                "rounded-lg h-9 px-4 font-medium transition-all",
                selectedTag === null
                  ? "bg-teal text-navy hover:bg-teal/90 shadow-md shadow-teal/20"
                  : "border-2 hover:border-teal/50",
              )}
            >
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "rounded-lg h-9 px-4 font-medium transition-all",
                  selectedTag === tag
                    ? "bg-teal text-navy hover:bg-teal/90 shadow-md shadow-teal/20"
                    : "border-2 hover:border-teal/50",
                )}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <Search size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          {/* Posts Grid - All posts equal */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtered.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group h-full"
              >
                <article
                  ref={(el) =>
                    (postRefs.current[index] = el as HTMLDivElement | null)
                  }
                  className="opacity-0 h-full flex flex-col rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-teal/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal/10 hover:-translate-y-2"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-teal/10 text-teal border border-teal/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-teal" />
                        <time>
                          {format(new Date(post.date), "MMM dd, yyyy")}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-teal" />
                        <span>{getReadingTime(post.excerpt)} min</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
