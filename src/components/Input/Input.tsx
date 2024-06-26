import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export const inputVariants = cva(["rounded-full transition-all"], {
  variants: {
    variant: {
      default: "bg-gray-100 text-black",
      outline: "border bg-transparent text-white",
    },
    hoverVariant: {
      default: "hover:bg-white hover:text-black",
      outline: "hover:border hover:bg-transparent hover:text-white",
    },
    focusVariant: {
      default: "focus:bg-gray-100 focus:text-black",
      outline: "focus:border focus:bg-transparent focus:text-white",
    },
  },
  defaultVariants: {
    variant: "default",
    hoverVariant: "default",
    focusVariant: "default",
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, ...props }, ref) => (
    <input
      className={inputVariants({ variant, className })}
      {...props}
      ref={ref}
    />
  ),
);
