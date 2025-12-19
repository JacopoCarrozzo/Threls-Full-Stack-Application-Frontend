interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = ({ children, isLoading, loadingText, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full bg-white text-[#4D24ED] border-4 border-[#4D24ED] text-xl font-bold py-6 rounded-2xl hover:bg-[#4D24ED] hover:text-white transition-all duration-500 shadow-2xl hover:shadow-[#4D24ED]/40 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? loadingText : children}
    </button>
  );
};