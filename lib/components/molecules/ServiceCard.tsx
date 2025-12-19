import { ServiceIcon } from "../atoms/ServiceIcon";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
}

export const ServiceCard = ({ title, description, iconName }: ServiceCardProps) => {
  return (
    <div className="group relative p-8 bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-[0_20px_25px_-5px_rgba(77,36,237,0.2)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 overflow-hidden cursor-pointer">
      
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4D24ED]/5 blur-[60px] group-hover:bg-[#4D24ED]/10 transition-all duration-700 rounded-full" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#4D24ED]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex justify-center mb-8 relative">
        <div className="absolute inset-0 bg-[#4D24ED]/20 blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full opacity-0 group-hover:opacity-100" />
        
        <div className="relative w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center group-hover:bg-[#4D24ED] group-hover:rotate-[12deg] transition-all duration-700 shadow-sm">
          <ServiceIcon 
            iconName={iconName} 
            className="w-12 h-12 text-[#4D24ED] group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-[12deg]" 
          />
        </div>
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#4D24ED] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-base text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#4D24ED] to-transparent w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
      
      <div className="absolute top-0 -inset-full h-full w-1/2 z-50 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />
    </div>
  );
};