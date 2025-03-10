import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2", // Base class
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      disabled: "false",
    },
  }
);

export const Button = ({ variant, size, disabled, className, children, ...props }) => {
  return (
    <button
      className={`${buttonVariants({ variant, size, disabled })} ${className}`}
      disabled={disabled === "true"}
      {...props}
    >
      {children}
    </button>
  );
};
