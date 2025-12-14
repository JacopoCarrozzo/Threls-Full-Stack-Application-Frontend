"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XCircle, CheckCircle } from "lucide-react";

const LARAVEL_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL;

interface CustomFormRendererProps {
  formId: string;
  displayTitle: string;
  formData: any;
  apiError: string | null;
}

const CustomFormRenderer: React.FC<CustomFormRendererProps> = ({
  formId,
  displayTitle,
  formData,
  apiError,
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error" | "loading">(
    "idle"
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    
    setSubmissionStatus("loading");
    setSubmitError(null);

    const data = new FormData(e.currentTarget);
    const payload: { [key: string]: string | File } = {};

    data.forEach((value, key) => {
        if (typeof value === 'string') {
            payload[key] = value;
        }
    });

    const submitUrl = `${LARAVEL_BASE_URL}/api/forms/${formId}/submit`;

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        formElement.reset(); 
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || "An unknown error occurred during submission.");
        setSubmissionStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Could not connect to the server. Please check your network connection.");
      setSubmissionStatus("error");
    }
  };

  const renderFormContent = () => {
    if (apiError) {
        return (
            <div className="text-center text-red-600 text-lg flex flex-col items-center">
                <XCircle className="w-8 h-8 mb-4" />
                <p>Form loading error: {apiError}</p>
            </div>
        );
    }
    
    if (formData.fields.length === 0) {
        return (
            <p className="text-center text-gray-500 text-lg">
                No fields configured in the form
            </p>
        );
    }

    if (submissionStatus === "success") {
      return (
        <div className="text-center py-12 bg-green-50 rounded-2xl border-4 border-green-500 transition-all duration-500">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4 animate-bounce" />
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h3>
          <p className="text-xl text-gray-700">
            We have received your message and will get back to you as soon as possible.
          </p>
        </div>
      );
    }

    return (
      <form className="space-y-10" onSubmit={handleSubmit}>
        {formData.fields.map((field: any, i: number) => (
          <div key={i} className="space-y-3">
            <label className="block text-xl font-semibold text-threls-primary">
              {field.label}
              {field.required && <span className="text-red-600 ml-1">*</span>}
            </label>
            {field.hint && (
              <p className="text-sm text-threls-primary/70">{field.hint}</p>
            )}
            {field.type.toLowerCase() === "textarea" ? (
              <textarea
                name={field.name || `field-${i}`}
                rows={6}
                required={!!field.required}
                placeholder={field.placeholder || ""}
                className="w-full px-6 py-4 text-lg border-4 border-[#4D24ED] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#4D24ED]/30 focus:border-[#4D24ED] transition-all resize-none"
                disabled={submissionStatus === "loading"}
              />
            ) : (
              <input
                type={field.type.toLowerCase() || "text"}
                name={field.name || `field-${i}`}
                required={!!field.required}
                placeholder={field.placeholder || ""}
                className="w-full px-6 py-4 text-lg border-4 border-[#4D24ED] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#4D24ED]/30 focus:border-[#4D24ED] transition-all"
                disabled={submissionStatus === "loading"}
              />
            )}
          </div>
        ))}
        {submitError && (
            <p className="text-center text-red-600 text-lg font-medium">
                Submission failed: {submitError}
            </p>
        )}
        <div className="pt-8">
          <button
            type="submit"
            className="w-full bg-white text-[#4D24ED] border-4 border-[#4D24ED] text-xl font-bold py-6 rounded-2xl hover:bg-[#4D24ED] hover:text-white transition-all duration-500 shadow-2xl hover:shadow-[#4D24ED]/40 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            disabled={submissionStatus === "loading"}
          >
            {submissionStatus === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-12 md:p-16">
        {renderFormContent()}
      </div>
    </div>
  );
};

export default CustomFormRenderer;