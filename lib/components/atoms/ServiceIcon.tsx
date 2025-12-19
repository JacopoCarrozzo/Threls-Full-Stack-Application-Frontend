import * as Icons from "lucide-react";

interface ServiceIconProps {
  iconName: string;
  className?: string;
}

export const ServiceIcon = ({ iconName, className = "" }: ServiceIconProps) => {
  const componentName = iconName
    ?.replace(/^lucide-/, "")
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  // @ts-ignore
  const Icon = Icons[componentName] ?? Icons.Code;

  return <Icon size={40} strokeWidth={2} className={className} />;
};
