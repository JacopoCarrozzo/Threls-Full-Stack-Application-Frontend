import { getPageBySlug } from "@/lib/api";
import ContentRenderer from "@/lib/components/templates/ContentRenderer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    if (!slug) return notFound();

    try {
        const page = await getPageBySlug(slug);

        if (!page) return notFound();

        const blocks = page.content || (page.data && page.data.content) || []; 
        
        return (
            <main className="min-h-screen">
                <ContentRenderer blocks={blocks} />
            </main>
        );
        
    } catch (error) {
        console.error("Errore nel caricamento della pagina:", error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">An error occurred</h1>
                    <p className="text-gray-600">Unable to load content.</p>
                </div>
            </div>
        );
    }
}