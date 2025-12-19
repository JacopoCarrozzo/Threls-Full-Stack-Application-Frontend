"use client";

import React, { useState } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { Input } from "../atoms/Input"; 
import { Button } from "../atoms/Button"; 

const LARAVEL_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CustomFormRendererProps {
  formId: string;
  displayTitle: string;
  formData: any;
  apiError: string | null;
}

const CustomFormRenderer: React.FC<CustomFormRendererProps> = ({
  formId,
  formData,
  apiError,
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    
    setSubmissionStatus("loading");
    setSubmitError(null);

    const data = new FormData(formElement);
    const payload: { [key: string]: string } = {};

    data.forEach((value, key) => {
      if (typeof value === 'string') {
        payload[key] = value;
      }
    });

    try {
      const response = await fetch(`${LARAVEL_BASE_URL}/api/forms/${formId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        formElement.reset(); 
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || "An unknown error occurred.");
        setSubmissionStatus("error");
      }
    } catch (err) {
      setSubmitError("Could not connect to the server.");
      setSubmissionStatus("error");
    }
  };

  if (apiError) return (
    <div className="text-center text-red-600 p-8">
      <XCircle className="w-8 h-8 mx-auto mb-4" />
      <p>Error: {apiError}</p>
    </div>
  );

  if (submissionStatus === "success") return (
    <div className="text-center py-12 bg-green-50 rounded-2xl border-4 border-green-500">
      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4 animate-bounce" />
      <h3 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h3>
      <p className="text-xl text-gray-700">Message received successfully.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-12 md:p-16">
      <form className="space-y-10" onSubmit={handleSubmit}>
        {formData?.fields?.map((field: any, i: number) => (
          <Input
            key={i}
            label={field.label}
            name={field.name || `field-${i}`}
            type={field.type?.toLowerCase() || "text"}
            required={!!field.required}
            placeholder={field.placeholder || ""}
            hint={field.hint}
            isTextArea={field.type?.toLowerCase() === "textarea"}
            disabled={submissionStatus === "loading"}
          />
        ))}

        {submitError && <p className="text-red-600 text-center">{submitError}</p>}

        <div className="pt-8">
          <Button type="submit" isLoading={submissionStatus === "loading"} loadingText="Sending...">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomFormRenderer;