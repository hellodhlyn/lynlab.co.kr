type HeaderProps = {
  text: string;
};

export default function Header({ text }: HeaderProps) {
  return <p className="py-8 text-2xl md:text-4xl font-black">{text}</p>;
}
