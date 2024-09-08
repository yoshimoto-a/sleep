interface Props {
  totalSleepTime: number;
}
export const TotalSleepTime: React.FC<Props> = ({ totalSleepTime }) => {
  const hour = Math.floor(totalSleepTime / 60);
  const min = totalSleepTime % 60;
  return <span className="text-xs">{`(${hour}時間${min}分)`}</span>;
};
