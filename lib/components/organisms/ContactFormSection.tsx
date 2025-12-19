import { Heading } from "../atoms/Heading";
import CustomFormRenderer from "./CustomFormRenderer";

interface ContactFormSectionProps {
  formId: string;
  formTitle?: string;
}

export const ContactFormSection = async ({ formId, formTitle }: ContactFormSectionProps) => {
  const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  let formData = { fields: [], name: "Form" };
  let error = null;

  try {
    const res = await fetch(`${LARAVEL_BASE_URL}/api/forms/${formId}`, {
      cache: "no-store", 
    });
    
    if (res.ok) {
      formData = await res.json();
    } else {
      error = `API Error: ${res.status}`;
    }
  } catch (err) {
    error = "Cannot reach server";
  }

  const displayTitle = formTitle || formData.name || "Contact Us";

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-3xl mx-auto px-6">
        <Heading 
          content={displayTitle} 
          level="h2" 
          className="mb-16" 
        />
        
        <CustomFormRenderer
          formId={formId}
          displayTitle={displayTitle}
          formData={formData}
          apiError={error}
        />
      </div>
    </section>
  );
};