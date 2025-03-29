import { useNavigate } from "react-router";
import { ContactForm } from "../../components";
import { IContactFormValues } from "../../components/ContactForm/types";
import { ContactsService } from "../../services";

export default function CreateContact() {
  const navigate = useNavigate();

  async function handleSubmit({ categoryId, ...values }: IContactFormValues) {
    try {
      const payload = {
        ...values,
        category_id: categoryId,
      };

      await ContactsService.createContact(payload);

      navigate("/");
    } catch {
      alert("Ocorrreu um erro ao cadastrar o contato.");
    }
  }

  return (
    <ContactForm
      title="Criar contato"
      buttonLabel="Cadastrar"
      onSubmit={handleSubmit}
    />
  );
}
