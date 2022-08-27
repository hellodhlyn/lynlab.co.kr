type TextButtonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  onClick?: Function;
};

export default function TextButton({ type, text, onClick }: TextButtonProps) {
  return (
    <button
      className="w-full h-12 bg-blue-500 text-white rounded-lg shadow-lg shadow-gray-200 hover:bg-blue-700 transition-colors"
      type={type || "submit"}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
    {text}
    </button>
  );
}
