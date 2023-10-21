type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <p className="my-8 text-2xl md:text-4xl font-black">{text}</p>;
}
