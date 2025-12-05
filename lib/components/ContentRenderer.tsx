import React from 'react';
import Image from 'next/image';

interface ContentBlock {
    type: string;
    data: any;
}

interface ContentRendererProps {
    blocks: ContentBlock[]; 
}

const RichTextRenderer: React.FC<{ html: string }> = ({ html }) => {
    
    return (
        <div 
            className="prose max-w-none my-6"
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
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