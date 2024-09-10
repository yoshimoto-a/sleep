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
      className="rounded-full bg-custom-blue w-[62px] h-[62px] flex flex-col justify-center items-center"
    >
      <Image
        src={icon}
        alt="menu icon"
        height={30}
        width={30}
        className="w-6 h-6"
      />
      <p className="text-xs">{text}</p>
    </button>
  );
};
