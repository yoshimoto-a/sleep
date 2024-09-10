"use client";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
interface ItemProps {
  icon: IconDefinition;
  text: string;
  link: string;
}

export const MenuItem: React.FC<ItemProps> = ({ icon, text, link }) => {
  return (
    <div className="w-full flex items-center justify-center gap-5">
      <Link href={link} className="flex flex-col">
        <FontAwesomeIcon icon={icon} className="pb-1" />
        <span className="text-sm">{text}</span>
      </Link>
    </div>
  );
};
