import type { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { useState } from "react";

type InputProps = {
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  onEnter?: Function;
  label?: string;
};

function inputElement(
  { name, type, placeholder, defaultValue, onEnter, label } : InputProps,
): [string, Dispatch<SetStateAction<string>>, JSX.Element] {
  const [value, setValue] = useState<string>(defaultValue || "");
  return [value, setValue, (
    <>
      {label && <p className="my-2 font-bold">{label}</p>}
      <input
        className="my-2 px-4 w-full h-12 border-0 bg-white rounded-lg shadow-lg shadow-gray-200"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        onKeyUp={(e) => {
          if (onEnter && e.key === "Enter") {
            onEnter();
          }
        }}
      />
    </>
  )];
}

export function Input(props: InputProps): JSX.Element {
  return inputElement(props)[2];
}

export function useInput(props : InputProps): [string, Dispatch<SetStateAction<string>>, JSX.Element] {
  return inputElement(props);
}
