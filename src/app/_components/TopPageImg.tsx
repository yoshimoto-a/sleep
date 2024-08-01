import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}
export const TopPageImg: React.FC<Props> = ({ src, alt }) => {
  return (
    <div className="w-1/2">
      <Image alt={alt} src={src} fill className="!relative" />
    </div>
  );
};
