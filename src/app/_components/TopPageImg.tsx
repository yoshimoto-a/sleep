import Image from "next/image";

interface Props {
  src: string;
}
export const TopPageImg: React.FC<Props> = ({ src }) => {
  return (
    <div className="w-1/2">
      <Image alt="topPageImage" src={src} fill className="!relative" />
    </div>
  );
};
