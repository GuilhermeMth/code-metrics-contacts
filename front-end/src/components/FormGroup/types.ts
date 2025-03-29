import { FieldError } from "react-hook-form";

interface IFormGroupProps {
  children: React.ReactNode;
  error?: FieldError;
}

export type { IFormGroupProps };
