interface Props {
  title: string;
}
export const ColumnName: React.FC<Props> = ({ title }) => {
  return <span className="w-1/3 text-center">{title}</span>;
};
