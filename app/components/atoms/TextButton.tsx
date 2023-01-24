type TextButtonProps = {
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
  text: string;
  onClick?: Function;
};

export default function TextButton({ type, fullWidth, text, onClick }: TextButtonProps) {
  return (
    <button
      className={`${fullWidth ? "w-full" : ""} mr-1 px-4 py-2 bg-blue-500 text-white text-center rounded-lg
                 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors`}
      type={type || "button"}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
}
