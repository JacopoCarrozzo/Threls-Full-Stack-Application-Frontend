import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ children, className = '' }: TextProps) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};