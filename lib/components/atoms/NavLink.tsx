import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
  href: string;
  label: string;
  isExternal: boolean;
  className?: string;
}

const BaseLinkContent = ({ label }: { label: string }) => (
  <>
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/nav:w-full transition-all duration-300" />
  </>
);

export const NavLink = ({ href, label, isExternal, className = "text-white/90 font-medium text-lg hover:text-white transition-all duration-300 relative group/nav" }: NavLinkProps) => {

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <BaseLinkContent label={label} />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      <BaseLinkContent label={label} />
    </Link>
  );
};