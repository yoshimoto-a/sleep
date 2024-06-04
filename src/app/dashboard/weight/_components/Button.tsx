interface Props {
  text: string;
  disabled?: boolean;
  onclick: () => void;
}
export const Button: React.FC<Props> = ({ disabled, text, onclick }) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={
        "w-40 h-10 mb-3 flex flex-col justify-center items-center border-solid border-2 border-slate-600 rounded-full"
      }
    >
      <p className="text-sm">{text}</p>
    </button>
  );
};
