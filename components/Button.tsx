import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const buttonClasses = cva(
  [
    "rounded-3xl",
    "font-bold",
    "hover:scale-110",
    "active:scale-100",
    "transition",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-violet-500",
          "text-white",
          "border-transparent",
          "hover:bg-violet-600",
          "disabled:bg-violet-300", // Faded violet background when disabled
          "disabled:cursor-not-allowed"
        ],
        secondary: [
          "bg-white",
          "text-black",
          "border-gray-400",
          "hover:bg-gray-100",
          "border-solid",
          "border-2",
          "border-gray-800",
          "disabled:bg-gray-200", // Light gray background when disabled
          "disabled:text-gray-500", // Faded text when disabled
          "disabled:cursor-not-allowed"
        ],
        danger: ["bg-red-500", "text-white", "hover:bg-red-600", "disabled:bg-red-200", // Light gray background when disabled
          "disabled:text-gray-500", // Faded text when disabled
          "disabled:cursor-not-allowed"],
        text: ["bg-transparent", "text-black", "hover:bg-gray-100", "disabled:text-gray-500", "disabled:cursor-not-allowed"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Use ButtonHTMLAttributes
  VariantProps<typeof buttonClasses> { }

const Button: FC<ButtonProps> = ({
  children,
  intent,
  size,
  className,
  disabled,
  ...props
}) => {
  return (
    <button className={buttonClasses({ intent, size, className })} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
