interface Props {
  item: string;
}
export const Item: React.FC<Props> = ({ item }) => {
  return <span className="w-1/4 text-center block">{item}</span>;
};
