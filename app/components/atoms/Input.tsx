import type { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { useState } from "react";

type InputProps = {
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  onEnter?: Function;
};

function inputElement(
  { name, type, placeholder, defaultValue, onEnter } : InputProps,
  setValue?: Dispatch<SetStateAction<string>>,
): JSX.Element {
  return (
    <input
      className="w-full h-12 border-0 bg-white rounded-lg shadow-lg shadow-gray-200"
      type={type}
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
  );
}

export function Input(props: InputProps): JSX.Element {
  return inputElement(props);
}

export function useInput(props : InputProps): [string, JSX.Element] {
  const [value, setValue] = useState<string>(props.defaultValue || "");
  return [value, inputElement(props, setValue)];
}
