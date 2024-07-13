import dayjs from "dayjs";
import Image from "next/image";
interface Props {
  date: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}
export const Header: React.FC<Props> = ({ date, onClickPrev, onClickNext }) => {
  return (
    <div className="flex justify-between mx-5">
      <Image
        src="/sleep/left.png"
        alt="left icon"
        width={20}
        height={15}
        onClick={onClickPrev}
        className="inline-block"
      />
      <span className="mx-auto">
        {dayjs(date).add(-6, "days").format("YYYY年M月D日(ddd)")}~
        {dayjs(date).format("YYYY年M月D日(ddd)")}
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
