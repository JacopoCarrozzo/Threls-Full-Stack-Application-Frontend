import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export const CustomImage = ({ src, alt, caption }: CustomImageProps) => {
  return (
    <figure className="my-12 text-center">
      <div className="relative w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={800}
          className="w-full h-auto object-cover max-w-5xl mx-auto shadow-2xl rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-lg italic text-threls-primary font-medium max-w-5xl mx-auto">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};