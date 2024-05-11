import { type VariantProps } from "class-variance-authority";
import { inputVariants as buttonVariants } from "@/components/Input";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};
