interface HeadingProps {
  content: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export const Heading = ({ content, level = "h2", className = "" }: HeadingProps) => {
  const baseClasses = "font-bold tracking-tight leading-tight text-center threls-gradient-text";
  const levelClasses = {
    h1: "text-5xl md:text-6xl",
    h2: "text-4xl md:text-5xl",
    h3: "text-3xl md:text-4xl",
    h4: "text-2xl md:text-3xl",
    h5: "text-xl md:text-2xl",
    h6: "text-lg md:text-xl uppercase tracking-wider",
  };

  const Tag = level;
  return <Tag className={`${baseClasses} ${levelClasses[level]} ${className}`}>{content}</Tag>;
};