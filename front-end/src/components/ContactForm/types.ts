import { z } from "zod";
import { validations } from "./validations";

type IContactFormValues = z.infer<typeof validations>;

interface IContactFormProps {
  title: string;
  buttonLabel: string;
  initialValues?: IContactFormValues;
  onSubmit(values: IContactFormValues): Promise<void>;
}

export type { IContactFormProps, IContactFormValues };
