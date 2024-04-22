"use client";
import Link from "next/link";
import Image from "next/image";

interface ItemProps {
  icon: string;
  text: string;
  link: string;
}

export const MenuItem: React.FC<ItemProps> = ({ icon, text, link }) => {
  return (
    <div className="flex items-center">
      <Link href={link}>
        <Image
          src={icon}
          alt="menu icon"
          width={20}
          height={20}
          className="mx-auto mb-1 mt-1"
        />
        <span className="text-sm">{text}</span>
      </Link>
    </div>
  );
};
