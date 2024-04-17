import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

interface Props {
  name: string;
  birthday: Date;
  date: Date;
}
export const Header: React.FC<Props> = ({ name, birthday, date }) => {
  dayjs.locale(ja);
  const handleClick = () => {
    //日付パラメータ変える
  };
  return (
    <div className="flex justify-between mt-10 mx-5">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={handleClick}
        className="inline-block"
      ></Image>
      <span>{dayjs(date).format("YYYY年M月D日(ddd)")}</span>
      <span className="">{name}ちゃん</span>
      <span className="">生後10ヶ月</span>
      <Image
        src="/sleep/right.png"
        alt="left icon"
        width={20}
        height={15}
        className="inline-block"
      ></Image>
    </div>
  );
};
