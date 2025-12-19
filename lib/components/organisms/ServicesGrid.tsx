import { ServiceCard } from "../molecules/ServiceCard";

interface ServicesGridProps {
  title?: string;
  items: { service_id: string | number }[];
}

export const ServicesGrid = async ({ title, items }: ServicesGridProps) => {
  if (!items?.length) return null;

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const selectedIds = items.map(i => Number(i.service_id));

  try {
    const res = await fetch(`${BASE_URL}/api/services`, {
      cache: "no-store",
    });

    const allServices = await res.json();

    const filtered = allServices
      .filter((s: any) => selectedIds.includes(Number(s.id)))
      .sort((a: any, b: any) => selectedIds.indexOf(Number(a.id)) - selectedIds.indexOf(Number(b.id)));

    if (!filtered.length) return null;

    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {title && (
          <h2 className="mb-16 text-4xl md:text-5xl font-bold text-center threls-gradient-text">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((service: any) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconName={service.icon}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading services:", error);
    return null;
  }
};