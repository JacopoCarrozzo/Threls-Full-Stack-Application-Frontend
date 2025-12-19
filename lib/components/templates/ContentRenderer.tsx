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
  
  if (!blocks?.length) {
    return null;
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
            return <RichText key={index} html={block.data?.body} />;

          case "image": {
            if (!block.data?.url) {
              return null;
            }

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
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;
