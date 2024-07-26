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
    <div className="flex justify-between mt-5 mx-5">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={onClickPrev}
        className="inline-block"
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
