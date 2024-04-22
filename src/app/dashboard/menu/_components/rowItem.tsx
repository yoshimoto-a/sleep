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
      <Link href={link} className="flex justify-start items-center">
        <Image
          src={icon}
          alt="menu icon"
          width={30}
          height={30}
          className="mx-auto mb-1 mt-1 mx-5"
        />
        <span className="text-lg">{title}</span>
      </Link>
    </div>
  );
};
