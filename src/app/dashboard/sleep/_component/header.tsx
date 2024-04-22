import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Image from "next/image";

interface Props {
  name: string;
  birthday: Date | null;
  date: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}
export const Header: React.FC<Props> = ({
  name,
  birthday,
  date,
  onClickPrev,
  onClickNext,
}) => {
  dayjs.locale(ja);

  return (
    <div className="flex justify-between mt-10 mx-5">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={onClickPrev}
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
        onClick={onClickNext}
        className="inline-block"
      ></Image>
    </div>
  );
};
