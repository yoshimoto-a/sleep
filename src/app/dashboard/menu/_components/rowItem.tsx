"use client";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  icon: string;
  title: string;
  link: string;
}
export const RowItem: React.FC<ItemProps> = ({ icon, title, link }) => {
  return (
    <div className="border-b w-4/5 mx-auto pt-5">
      <Link href={link} className="flex items-center justify-start">
        <Image
          src={icon}
          alt="menu icon"
          height={30}
          width={30}
          className="p-2"
        />
        <span className="text-lg">{title}</span>
      </Link>
    </div>
  );
};
