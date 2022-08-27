import type { HTMLInputTypeAttribute } from "react";
import { useState } from "react";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  onEnter?: Function;
};

export function useInput({ type, placeholder, defaultValue, onEnter } : InputProps): [string, JSX.Element] {
  const [value, setValue] = useState<string>(defaultValue || "");
  const input = (
    <input
      className="w-full h-12 border-0 bg-white rounded-lg shadow-lg shadow-gray-200"
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={(e) => {
        if (onEnter && e.key === "Enter") {
          onEnter();
        }
      }}
    />
  );

  return [value, input];
}
