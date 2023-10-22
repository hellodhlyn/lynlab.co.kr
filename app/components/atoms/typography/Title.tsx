type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return (
    <p className="my-8 text-3xl md:text-4xl font-bold text-neutral-900">
      {text}
    </p>
  );
}
