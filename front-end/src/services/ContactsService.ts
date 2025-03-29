import { IContact } from "../@types/Contact";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetContactsParams {
  name?: string;
  orderBy?: orderBy;
}

class ContactsService {
  async getContacts(params: IGetContactsParams) {
    const response = await api.get<IContact[]>("/contacts", { params });
    return response.data;
  }

  async getContact(id: string) {
    const response = await api.get<IContact>(`/contacts/${id}`);
    return response.data;
  }

  async createContact(contact: Omit<IContact, "id" | "category_name">) {
    const response = await api.post<void>("/contacts", contact);
    return response.data;
  }

  async updateContact(
    id: string,
    contact: Omit<IContact, "id" | "category_name">
  ) {
    const response = await api.put<void>(`/contacts/${id}`, contact);
    return response.data;
  }

  async deleteContact(id: string) {
    const response = await api.delete<void>(`/contacts/${id}`);
    return response.data;
  }
}

export default new ContactsService();

export type { orderBy };
