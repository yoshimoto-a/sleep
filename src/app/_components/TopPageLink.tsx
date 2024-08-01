import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  link: string;
  children: ReactNode;
  backgroundColor: string;
}
export const TopPageLink: React.FC<Props> = ({
  link,
  children,
  backgroundColor,
}) => {
  return (
    <Link href={link} className="px-2">
      <div
        className={`px-5 py-2 w-[140px] rounded-full text-center ${backgroundColor}`}
      >
        {children}
      </div>
    </Link>
  );
};
