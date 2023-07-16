type SelectProps = {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  label?: string;
  defaultValue?: string;
};

export function Select({ name, options, label, defaultValue }: SelectProps): JSX.Element {
  return (
    <>
      {label && <p className="my-2 font-bold">{label}</p>}
      <select
        name={name}
        className="w-full my-2 h-12 border-0 bg-white rounded-lg shadow-lg shadow-gray-200"
        defaultValue={defaultValue || options[0].value}
      >
        {options.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
      </select>
    </>
  );
}
