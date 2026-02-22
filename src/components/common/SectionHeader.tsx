interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export const SectionHeader = ({ number, title, className }: SectionHeaderProps) => (
  <h2 className={`text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4 ${className}`}>
    <span className="text-teal font-mono">{number}</span>
    {title}
    <div className="h-px bg-border flex-grow ml-4"></div>
  </h2>
);
