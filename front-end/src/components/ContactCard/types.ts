import { IContact } from "../../@types/Contact";

interface IContactCardProps {
  data: IContact;
  onDelete(data: IContact): void;
}

export type { IContactCardProps };
