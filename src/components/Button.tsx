// src/components/Button.tsx

import React from 'react';

// Define the properties (props) that our button component will accept
interface ButtonProps {
  children: React.ReactNode; // The text or content inside the button
  onClick?: () => void;      // Optional click handler function
  className?: string;       // Optional custom CSS classes
  href?: string;            // Optional link for an anchor tag
}

export const Button = ({ children, onClick, className, href }: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200";
  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};