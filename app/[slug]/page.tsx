import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/api";
import ContentRenderer from "@/lib/components/ContentRenderer";

interface PageContent {
  title: string;
  content: any[];
}

export const revalidate = 0;

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) {

  const { slug } = await params;

  let pageData: PageContent | null = null;

  try {
    pageData = await getPageBySlug(slug);
  } catch (error) {
    console.error(`Errore fetching pagina "${slug}":`, error);
    notFound(); 
  }

  if (!pageData) {
    notFound();
  }

  return (
  <article>

  <section>
    <ContentRenderer blocks={pageData.content} />
  </section>

</article>
);
}