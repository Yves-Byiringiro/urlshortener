import React from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md !text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        blue: "bg-blue-600 text-white hover:bg-blue-500",
        "blue-outline":
          "border-blue-600 border-2 text-blue-600 hover:bg-blue-500",
        default:
          "bg-gray-400 border-0 text-white border-gray-100/20 border shadow hover:bg-gray-100 text-sm dark:text-white dark:hover:bg-gray-100 ",
        primary:
          "bg-primary-300 border-0 border-- text-white shadow hover:bg-primary-400 text-sm dark:hover:bg-primary-200 dark:border-primary-200 ",
        white: "bg-white text-black hover:bg-gray-200",
        "primary-light":
          "bg-primary-100/30 hover:text-white text-primary-300 border-0 shadow hover:bg-primary-400 dark:bg-primary-200/20 dark:text-primary-100 dark:hover:bg-primary-200/40 dark:border-primary-200 ",
        destructive:
          "bg-red-200 dark:bg-opacity-80 dark:hover:bg-opacity-100  dark:hover:text-white text-red-900 shadow-sm hover:bg-red-300 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-600",
        outline:
          "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-500 dark:text-secondary-white shadow-sm dark:hover:bg-gray-400",
        ghost: "hover:bg-accent hover:text-primary-400 hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 !text-xs",
        md: "rounded-md px-3 py-3 !text-lg",
        lg: "rounded-xl lg:rounded-2xl px-4 font-bold text-lg lg:text-xl py-2 lg:py-3",
        icon: "h-9 w-9",
        "icon-sm-rounded": "!p-1.5 border-transparent !rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
