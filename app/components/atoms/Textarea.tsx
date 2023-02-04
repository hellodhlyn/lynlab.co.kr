import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type TextareaProps = {
  name?: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
  onEnter?: Function;
  label?: string;
};

function textareaElement(
  { name, rows, placeholder, defaultValue, onEnter, label } : TextareaProps,
  setValue?: Dispatch<SetStateAction<string>>,
): JSX.Element {
  return (
    <>
      {label && <p className="py-4 font-bold">{label}</p>}
      <textarea
        className="w-full border-0 bg-white rounded-lg shadow-lg shadow-gray-200"
        rows={rows}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => setValue && setValue(e.target.value)}
        onKeyUp={(e) => {
          if (onEnter && e.key === "Enter") {
            onEnter();
          }
        }}
      />
    </>
  );
}

export function Textarea(props: TextareaProps): JSX.Element {
  return textareaElement(props);
}

export function useTextarea(props : TextareaProps): [string, JSX.Element] {
  const [value, setValue] = useState<string>(props.defaultValue || "");
  return [value, textareaElement(props, setValue)];
}
