import { ReactNode, ComponentPropsWithRef, forwardRef } from "react";

type Variant =
  | "outlined"
  | "contained-blu"
  | "contained-gry"
  | "contained-blu500";

interface Props extends Omit<ComponentPropsWithRef<"button">, "className"> {
  variant?: Variant;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant, children, ...props }, ref) => {
    const className = () => {
      switch (variant) {
        case "outlined":
          return "border-solid border-2 border-slate-600";
        case "contained-blu":
          return "bg-custom-blue";
        case "contained-gry":
          return "bg-gray-300";
        case "contained-blu500":
          return "bg-blue-500 text-white";
        default:
          return "";
      }
    };
    return (
      <button
        ref={ref}
        {...props}
        className={`w-full h-full rounded-full ${className()}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
