"use client";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  icon: string;
  text: string;
  link: string;
}

export const MenuItem: React.FC<ItemProps> = ({ icon, text, link }) => {
  return (
    <div className="flex items-center justify-center w-1/5">
      <Link href={link}>
        <Image
          src={icon}
          alt="menu icon"
          height={20}
          width={20}
          className="mx-auto mb-1 mt-1"
        />
        <span className="text-sm">{text}</span>
      </Link>
    </div>
  );
};
