import { useNavigate, useParams } from "react-router";
import { IContactFormValues } from "../../components/ContactForm/types";
import { ContactsService } from "../../services";
import { ContactForm } from "../../components";
import { useEffect, useState } from "react";

export default function UpdateContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<IContactFormValues>();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContact(id!);

        setInitialValues({
          name: contact.name,
          email: contact.email ?? "",
          phone: contact.phone ?? "",
          categoryId: contact.category_id ?? "",
        });
      } catch {
        alert("Ocorreu um erro ao buscar o contato.");
      }
    }

    if (id) {
      loadContact();
    }
  }, [id]);

  async function handleSubmit({ categoryId, ...values }: IContactFormValues) {
    if (!id) return;

    try {
      const payload = {
        ...values,
        category_id: categoryId,
      };

      await ContactsService.updateContact(id, payload);

      navigate("/");
    } catch {
      alert("Ocorrreu um erro ao cadastrar o contato.");
    }
  }

  return (
    <ContactForm
      title={initialValues?.name ?? "Atualizar contato"}
      buttonLabel="Salvar"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}
