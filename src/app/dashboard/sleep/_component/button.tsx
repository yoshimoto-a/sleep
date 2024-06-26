import Image from "next/image";
interface Props {
  icon: string;
  text: string;
  onclick: (arg: string) => void;
  action: string;
}

export const Button: React.FC<Props> = ({ icon, text, onclick, action }) => {
  return (
    <button
      onClick={() => onclick(action)}
      className="rounded-full bg-custom-blue w-20 h-20 flex flex-col justify-center items-center"
    >
      <Image src={icon} alt="menu icon" height={30} width={30} />
      <p className="text-sm">{text}</p>
    </button>
  );
};
