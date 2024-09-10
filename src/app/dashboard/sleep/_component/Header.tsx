"use client";
import ja from "dayjs/locale/ja";
import Image from "next/image";
import { dayjs } from "../../../../utils/dayjs";
import { useGetBaby } from "../../_hooks/useGetBaby";

interface Props {
  date: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}
export const Header: React.FC<Props> = ({ date, onClickPrev, onClickNext }) => {
  const { isLoading, data, error } = useGetBaby();
  dayjs.locale(ja);
  if (isLoading || !data) return <div>読込み中</div>;
  if (error) return <div>エラー発生</div>;

  return (
    <div className="flex items-center justify-between pt-5 px-1">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={18}
        height={19}
        onClick={onClickPrev}
        className="inline-block w-[15px] h-[15px]"
      />
      <span>{dayjs(date).format("YYYY年M月D日(ddd)")}</span>
      <span className="">{"data" in data && data.data.name}ちゃん</span>
      <span className="">
        {"data" in data &&
          `生後${Math.floor(
            dayjs().diff(dayjs(data.data.birthday), "month")
          )}ヶ月`}
      </span>
      {!dayjs(date).isSame(dayjs(), "day") && (
        <Image
          src="/sleep/right.png"
          alt="right icon"
          width={20}
          height={15}
          onClick={onClickNext}
          className="inline-block"
        />
      )}
    </div>
  );
};
