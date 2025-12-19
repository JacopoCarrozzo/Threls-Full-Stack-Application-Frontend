interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  hint?: string;
  isTextArea?: boolean;
}

export const Input = ({ label, required, hint, isTextArea, ...props }: InputProps) => {
  const baseClasses = "w-full px-6 py-4 text-lg border-4 border-[#4D24ED] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#4D24ED]/30 focus:border-[#4D24ED] transition-all";
  
  return (
    <div className="space-y-3">
      <label className="block text-xl font-semibold text-threls-primary">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {hint && <p className="text-sm text-threls-primary/70">{hint}</p>}
      
      {isTextArea ? (
        <textarea rows={6} className={`${baseClasses} resize-none`} {...(props as any)} />
      ) : (
        <input className={baseClasses} {...(props as any)} />
      )}
    </div>
  );
};