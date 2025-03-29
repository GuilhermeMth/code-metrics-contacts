import { UseFormRegister } from "react-hook-form";

interface ISelectProps<T extends Record<string, any>>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  register: UseFormRegister<any>;
  options: T[];
  optionLabelKey: keyof T;
  optionValueKey: keyof T;
  optionKeyExtractor: keyof T;
}

export type { ISelectProps };
