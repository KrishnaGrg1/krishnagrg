import { forwardRef, HTMLAttributes } from "react";

const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => (
  <section ref={ref} className={`py-20 md:py-32 ${className}`} {...props}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
));
Section.displayName = "Section";
export { Section };
