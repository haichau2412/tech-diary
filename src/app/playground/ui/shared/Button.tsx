import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {
  customProps?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  ref,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      ref={ref}
      {...props}
    ></button>
  );
};

Button.displayName = "Button";
