interface PropsItem {
  title: string;
  time: string;
}

export const MainTime: React.FC<PropsItem> = ({ title, time }) => {
  return (
    <div className="rounded-md bg-white w-40 pt-3 text-center">
      <span className="text-sm">{title}</span>
      <div className="flex items-center justify-center">
        <span className="text-5xl pb-3">{time}</span>
      </div>
    </div>
  );
};
