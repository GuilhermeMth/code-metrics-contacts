import styles from "./styles.module.css";
import { ISelectProps } from "./types";

export default function Select<T extends Record<string, any>>({
  name,
  register,
  options,
  optionLabelKey,
  optionValueKey,
  optionKeyExtractor,
  ...props
}: ISelectProps<T>) {
  return (
    <select className={styles.select} {...props} {...register(name)}>
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option[optionKeyExtractor]} value={option[optionValueKey]}>
          {option[optionLabelKey]}
        </option>
      ))}
    </select>
  );
}
