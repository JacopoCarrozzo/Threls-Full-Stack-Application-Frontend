interface RichTextProps {
  html: string;
  className?: string;
}

export const RichText = ({ html, className = "" }: RichTextProps) => {
  return (
    <div
      className={`prose prose-lg max-w-none text-gray-700 leading-relaxed 
                  prose-headings:text-threls-primary prose-headings:font-bold
                  prose-p:text-lg mx-auto text-center ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};