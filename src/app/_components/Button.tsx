import { ReactNode } from "react";

type Variant =
  | "outlined"
  | "contained-blu"
  | "contained-gry"
  | "contained-blu500"
  | "none";

type Type = "button" | "submit";

interface Props {
  variant: Variant;
  type: Type;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  variant,
  type,
  onClick,
  children,
  disabled,
}) => {
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
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-full rounded-full ${className()}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
