import React from "react";
import Image from "next/image";
import { getTeamMembers } from "@/lib/api";
import CustomFormRenderer from "@/lib/components/CustomFormRenderer";

interface ContentBlock {
  type: string;
  data: any;
}

interface ContentRendererProps {
  blocks: ContentBlock[];
}

interface HeadingBlockData {
  content: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const LARAVEL_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

const RichTextRenderer: React.FC<{ html: string }> = ({ html }) => {
  return (
    <div
      className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                     prose-headings:text-threls-primary prose-headings:font-bold
                     prose-p:text-lg prose-p:leading-relaxed
                     prose-a:text-threls-primary prose-a:underline hover:prose-a:opacity-80
                     prose-strong:text-threls-primary prose-em:text-threls-primary
                     prose-blockquote:border-l-threls-primary prose-blockquote:bg-purple-50/50 prose-blockquote:text-threls-dark
                     prose-ul:list-disc prose-ol:list-decimal prose-li:my-3
                     prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
                     mx-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const HeadingRenderer: React.FC<HeadingBlockData> = ({ content, level = "h2" }) => {
  const baseClasses = "font-bold tracking-tight leading-tight text-center threls-gradient-text";
  const levelClasses = {
    h1: "text-5xl md:text-6xl",
    h2: "text-4xl md:text-5xl",
    h3: "text-3xl md:text-4xl",
    h4: "text-2xl md:text-3xl",
    h5: "text-xl md:text-2xl",
    h6: "text-lg md:text-xl uppercase tracking-wider",
  };

  const className = `${baseClasses} ${levelClasses[level]} mb-6 mt-12`;

  switch (level) {
    case "h1":
      return <h1 className={className}>{content}</h1>;
    case "h2":
      return <h2 className={className}>{content}</h2>;
    case "h3":
      return <h3 className={className}>{content}</h3>;
    case "h4":
      return <h4 className={className}>{content}</h4>;
    case "h5":
      return <h5 className={className}>{content}</h5>;
    case "h6":
      return <h6 className={className}>{content}</h6>;
    default:
      return <h2 className={className}>{content}</h2>;
  }
};

const ContentRenderer: React.FC<ContentRendererProps> = async ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-500">There is no content yet for this page.</p>
      </div>
    );
  }

  const teamMembers = await getTeamMembers();

  return (
    <div className="space-y-16 py-12">
      {blocks.map(async (block, index) => {
        switch (block.type) {
          case "text":
            return (
              <div
                key={index}
                className="animate-fade-in my-16 max-w-4xl mx-auto"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RichTextRenderer html={block.data.body} />
              </div>
            );

          case "heading":
            const headingData = block.data as {
              text?: string;
              level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            };
            if (!headingData.text) return null;

            return (
              <div
                key={index}
                className="animate-slide-up my-20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <HeadingRenderer content={headingData.text} level={headingData.level || "h2"} />
                {(headingData.level === "h1" || headingData.level === "h2") && (
                  <div className="h-1 w-32 threls-bg rounded-full mx-auto" />
                )}
              </div>
            );

          case "image":
            const { url: relativePath, alt, caption } = block.data;
            if (!relativePath) return null;

            let imageUrl: string;
            if (relativePath.startsWith("http")) {
              imageUrl = relativePath;
            } else {
              imageUrl = `${LARAVEL_BASE_URL}${
                relativePath.startsWith("/") ? "" : "/"
              }${relativePath}`;
            }

            return (
              <figure key={index} className="my-12 text-center">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={alt || "Image"}
                    width={1400}
                    height={800}
                    className="w-full h-auto object-cover max-w-5xl mx-auto shadow-2xl rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                    priority
                  />
                </div>
                {caption && (
                  <figcaption className="mt-4 text-lg italic text-threls-primary font-medium max-w-5xl mx-auto">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );

          case "team-grid":
            const {
              members = [],
              columns = "3",
              show_bio = true,
              title: sectionTitle = "Meet the Team",
            } = block.data;

            if (!members || members.length === 0) {
              return (
                <div key={index} className="py-16 text-center text-gray-500 text-xl">
                  No members selected
                </div>
              );
            }

            const gridColsMap = {
              "2": "md:grid-cols-2",
              "3": "md:grid-cols-3",
              "4": "md:grid-cols-4",
            } as const;
            const gridCols =
              gridColsMap[columns as keyof typeof gridColsMap] || "md:grid-cols-3";

            return (
              <section
                key={index}
                className="py-24 bg-gradient-to-b from-purple-50 via-white to-purple-50"
              >
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 threls-gradient-text">
                    {sectionTitle}
                  </h2>

                  <div className={`grid grid-cols-1 ${gridCols} gap-12 lg:gap-16`}>
                    {members.map((item: any, i: number) => {
                      const memberId = Number(item.team_member_id);
                      const member = teamMembers.find((m: any) => m.id === memberId);
                      if (!member) return null;

                      const photoUrl =
                        member.photo_url ||
                        (member.photo ? `${LARAVEL_BASE_URL}/storage/${member.photo}` : null);

                      return (
                        <div
                          key={i}
                          className="group relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                        >
                          <div className="relative overflow-hidden rounded-t-3xl group">
                            {photoUrl ? (
                              <Image
                                src={photoUrl}
                                alt={member.name || "Team Member"}
                                width={600}
                                height={600}
                                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                priority={i < 3}
                              />
                            ) : (
                              <div className="bg-gradient-to-br from-[#4D24ED] to-[#3a1ab3] w-full h-96 rounded-t-3xl" />
                            )}

                            <div className="absolute inset-0 bg-[#4D24ED]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                              <div className="text-white text-center">
                                <h3 className="text-3xl font-bold">{member.name}</h3>
                                <p className="text-xl mt-2 opacity-90">{member.role}</p>
                              </div>
                            </div>

                            <div className="absolute inset-0 rounded-t-3xl ring-0 ring-[#4D24ED] group-hover:ring-8 transition-all duration-500 pointer-events-none" />
                          </div>

                          <div className="relative p-8 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-threls-primary transition-colors duration-300">
                              {member.name}
                            </h3>
                            <p className="text-xl font-semibold text-threls-primary mt-2">
                              {member.role}
                            </p>
                            {show_bio && member.bio && (
                              <div
                                className="mt-6 text-gray-600 prose prose-sm max-w-none leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: member.bio }}
                              />
                            )}
                          </div>

                          <div className="absolute -inset-1 threls-bg/20 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );

          case "custom-form":
            const { form_id, formTitle } = block.data;
            if (!form_id) return null;

            let formData = { fields: [], name: "Form" };
            let error = null;

            try {
              const res = await fetch(`${LARAVEL_BASE_URL}/api/forms/${form_id}`, {
                cache: "no-store",
              });
              if (res.ok) {
                formData = await res.json();
              } else {
                error = `API Error: ${res.status} ${res.statusText}`;
                console.error(error);
              }
            } catch (err) {
              error = "Cannot reach server (CORS or network error)";
              console.error("Fetch Error:", err);
            }

            const displayTitle = formTitle || formData.name || "Contact Us";

            return (
              <section
                key={index}
                className="py-24 bg-gradient-to-b from-purple-50 to-white"
              >
                <div className="max-w-3xl mx-auto px-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 threls-gradient-text">
                    {displayTitle}
                  </h2>
                  <CustomFormRenderer
                    formId={form_id}
                    displayTitle={displayTitle}
                    formData={formData}
                    apiError={error}
                  />
                </div>
              </section>
            );

          default:
            return (
              <div
                key={index}
                className="p-8 border-l-4 threls-border bg-purple-50 rounded-r-lg"
              >
                <p className="text-threls-primary font-medium">
                  Unrecognized block: {block.type}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
};

export default ContentRenderer;