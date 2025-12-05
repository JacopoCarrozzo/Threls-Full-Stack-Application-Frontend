import { getPageBySlug } from "@/lib/api";
import ContentRenderer from "@/lib/components/ContentRenderer";

const HOMEPAGE_SLUG = 'home'; // Make sure you have a page with slug 'home' in Laravel

export default async function HomePage() {
    let pageData;

    try {
        pageData = await getPageBySlug(HOMEPAGE_SLUG);
    } catch (error) {
        console.error("Error fetching the Home Page:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-10 text-center bg-white border border-cyan-300 rounded-lg shadow-2xl max-w-lg mx-auto mt-20">
                
                <div className="text-6xl mb-4 text-cyan-700" role="img" aria-label="Error">
                    ❌
                </div>
                
                <h1 className="text-3xl font-extrabold text-cyan-800 mb-3">
                    Content Not Available
                </h1>
                
                <p className="text-lg text-gray-700 mb-6">
                    We could not connect to the Content Management System or retrieve the data for this page.
                </p>

                <p className="text-sm text-cyan-600 bg-cyan-50 p-3 rounded-md border border-cyan-200">
                    Hint: Please verify the API connection or the 'homepage' slug configuration.
                </p>

            </div>
        );
    }

    return (
    <article className="prose max-w-none">
      <h1 className="text-4xl font-bold mb-8">{pageData.title}</h1>
      <section>
        <ContentRenderer blocks={pageData.content} />
      </section>
    </article>
    );
}