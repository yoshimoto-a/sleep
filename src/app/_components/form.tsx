import React from "react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}
export const Form: React.FC<Props> = ({ handleSubmit, children }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <form
        onSubmit={handleSubmit}
        className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4 pointer-events-auto"
      >
        {children}
      </form>
    </div>
  );
};
