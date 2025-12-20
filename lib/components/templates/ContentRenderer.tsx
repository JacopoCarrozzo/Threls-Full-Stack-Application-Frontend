import React from "react";
import { getTeamMembers } from "@/lib/api";
import { TeamSection } from "../organisms/TeamSection";
import { ContactFormSection } from "../organisms/ContactFormSection";
import { Heading } from "../atoms/Heading";
import { RichText } from "../atoms/RichText";
import { CustomImage } from "../atoms/CustomImage";
import { ServicesGrid } from "../organisms/ServicesGrid";

interface ContentBlock {
  type: string;
  data: any;
}

interface ContentRendererProps {
  blocks: ContentBlock[];
}

const ContentRenderer = async ({ blocks }: ContentRendererProps) => {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <span className="text-5xl text-gray-300">🚀</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-500 max-w-md leading-relaxed">
          We are preparing new content for this section. <br /> 
          Come back and visit us soon!
        </p>
        <div className="mt-8 h-1 w-20 threls-primary rounded-full opacity-30" />
      </div>
    );
  }

  const teamMembers = await getTeamMembers();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="space-y-16 py-12">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <Heading
                key={index}
                content={block.data?.text}
                level={block.data?.level ?? "h2"}
              />
            );

          case "text":
            return (
              <div key={index} className="max-w-4xl mx-auto px-6">
                <RichText html={block.data?.body} />
              </div>
            );

          case "image": {
            if (!block.data?.url) return null;
            const src = block.data.url.startsWith("http")
              ? block.data.url
              : `${BASE_URL}/storage/${block.data.url}`;

            return (
              <CustomImage
                key={index}
                src={src}
                alt={block.data?.alt ?? ""}
                caption={block.data?.caption}
              />
            );
          }

          case "services-grid":
            return (
              <ServicesGrid
                key={index}
                title={block.data?.title}
                items={block.data?.items}
              />
            );

          case "team-grid":
            return (
              <TeamSection
                key={index}
                title={block.data?.title}
                members={block.data?.members}
                teamData={teamMembers}
                columns={block.data?.columns}
                showBio={block.data?.show_bio}
              />
            );

          case "custom-form":
            return (
              <ContactFormSection
                key={index}
                formId={block.data?.form_id}
                formTitle={block.data?.title}
              />
            );

          default:
            console.warn(`Unknown block type: ${block.type}`);
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;