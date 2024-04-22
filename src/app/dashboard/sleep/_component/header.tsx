import Image from "next/image";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

interface Props {
  name: string;
  birthday: Date | null;
  date: Date;
  changeDate: (num: number) => void;
}
export const Header: React.FC<Props> = ({
  name,
  birthday,
  date,
  changeDate,
}) => {
  dayjs.locale(ja);
  const handleClick = (amount: number) => {
    changeDate(amount);
  };

  return (
    <div className="flex justify-between mt-10 mx-5">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={() => handleClick(-1)}
        className="inline-block"
      ></Image>
      <span>{dayjs(date).format("YYYY年M月D日(ddd)")}</span>
      <span className="">{name}ちゃん</span>
      <span className="">{`生後${Math.floor(
        dayjs().diff(dayjs(birthday), "month")
      )}ヶ月`}</span>
      <Image
        src="/sleep/right.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={() => handleClick(1)}
        className="inline-block"
      ></Image>
    </div>
  );
};
