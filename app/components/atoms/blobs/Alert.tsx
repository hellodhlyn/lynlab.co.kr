type AlertProps = {
  icon: string;
  title?: string;
  content: string;
  color?: "gray" | "green";
};

export default function Alert({ icon, title, content, color }: AlertProps) {
  const classes = {
    gray: {
      bgColor: "bg-gray-300",
      shadowColor: "shadow-gray-200",
    },
    green: {
      textColor: "text-white",
      bgColor: "bg-gradient-to-r from-green-600 to-teal-600",
      shadowColor: "shadow-green-200",
    },
  }[color || "gray"];

  return (
    <div className={`p-4 flex rounded-lg shadow-lg ${classes.shadowColor} ${classes.bgColor} ${classes.textColor}`}>
      <div className="pr-2">
        {icon}
      </div>
      <div className="flex-grow">
        {title && <p className="font-bold">title</p>}
        <p>{content}</p>
      </div>
    </div>
  );
}
