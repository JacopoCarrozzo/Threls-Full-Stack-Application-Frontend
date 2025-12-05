import React from 'react';
import Image from 'next/image';

interface ContentBlock {
    type: string;
    data: any;
}

interface ContentRendererProps {
    blocks: ContentBlock[]; 
}

interface HeadingBlockData {
    content: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Ipotizzo che il livello sia passato
}

const RichTextRenderer: React.FC<{ html: string }> = ({ html }) => {
    
    return (
        <div 
            className="prose max-w-none my-6"
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
};

const HeadingRenderer: React.FC<HeadingBlockData> = ({ content, level = 'h2' }) => {
  const classMap: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string> = {
    h1: 'text-5xl font-extrabold mt-10 mb-6 leading-tight',
    h2: 'text-4xl font-bold mt-8 mb-5',
    h3: 'text-3xl font-semibold mt-7 mb-4',
    h4: 'text-2xl font-medium mt-6 mb-3',
    h5: 'text-xl font-medium mt-5 mb-3',
    h6: 'text-lg font-medium mt-4 mb-2 text-gray-700',
  };

  const className = classMap[level] || classMap.h2;

  const headings = {
    h1: <h1 className={className}>{content}</h1>,
    h2: <h2 className={className}>{content}</h2>,
    h3: <h3 className={className}>{content}</h3>,
    h4: <h4 className={className}>{content}</h4>,
    h5: <h5 className={className}>{content}</h5>,
    h6: <h6 className={className}>{content}</h6>,
  };

  return headings[level] || headings.h2;
};

const LARAVEL_BASE_URL = 'http://threls-full-stack-application.test';

const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
    if (!blocks || blocks.length === 0) {
        return <p className="text-gray-500 italic">There is no content to display for this page.</p>;
    }

    return (
        <div className="space-y-8">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'text':
                        return (
                            <RichTextRenderer key={index} html={block.data.body} />
                        );

                    case 'heading':
  
                        const headingData = block.data as { text?: string; level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };
                        if (!headingData.text) return null;

                        return (
                        <HeadingRenderer
                        key={index}
                        content={headingData.text}          
                        level={headingData.level || 'h2'}  
                        />
                        );
                        
                    case 'image': 
                        const { url: relativePath, alt} = block.data;

                        if (!relativePath) return null;

                        let imageUrl: string;

                        if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
                        imageUrl = relativePath;
                        } else {
                        imageUrl = `${LARAVEL_BASE_URL}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
                        }

                        return (
                        <div key={index} className="my-8">
                        <figure className="relative w-full h-96"> 
                        <Image
                            src={imageUrl} 
                            alt={alt || 'Immagine CMS'} 
                            fill 
                            sizes="(max-width: 1200px) 100vw, 800px" 
                            style={{ objectFit: 'contain' }} 
                            className="rounded-lg shadow-lg"
                        />
                        </figure>
                        </div>
                        );

                    
                    default:
                        return (
                            <div key={index} className="p-4 border-l-4 border-yellow-500 bg-yellow-100">
                                Unknown Block ({block.type})
                            </div>
                        );
                }
            })}
        </div>
    );
};

export default ContentRenderer;