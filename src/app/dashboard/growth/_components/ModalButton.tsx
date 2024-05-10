interface Props {
  onClick: () => void;
  text: string;
  colorClass: string;
}

export const ModalButton: React.FC<Props> = ({ onClick, text, colorClass }) => {
  return (
    <button
      onClick={onClick}
      className={`w-2/5 rounded px-4 py-2 ${colorClass}`}
    >
      {text}
    </button>
  );
};
