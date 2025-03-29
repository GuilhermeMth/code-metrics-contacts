import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import ContactCard from "../../components/ContactCard";
import { ContactsService } from "../../services";
import { IContact } from "../../@types/Contact";
import { Button, Input, Loader } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { orderBy } from "../../services/ContactsService";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<orderBy>("ASC");

  const { register, watch } = useForm();

  const search = watch("search");

  const debouncedSearch = useDebounce(search);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contacts = await ContactsService.getContacts({
        name: debouncedSearch,
        orderBy,
      });
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleDeleteContact = useCallback(async (contact: IContact) => {
    try {
      setIsLoading(true);
      await ContactsService.deleteContact(contact.id);
      loadContacts();
    } catch {
      alert("Ocorreu um erro ao deletar um contato.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleToggleOrderBy() {
    setOrderBy((orderBy) => (orderBy === "ASC" ? "DESC" : "ASC"));
  }

  function handleNavigateToCreateContact() {
    navigate("/contacts/create");
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <section className={styles.contactsList}>
        <header>
          <Input
            name="search"
            register={register}
            placeholder="Buscar contato..."
          />
          {search && (
            <p>
              Resultados encontrados para <strong>"{search}"</strong>.
            </p>
          )}
          <div>
            <button onClick={handleToggleOrderBy}>
              <strong>Nome</strong>
              <img data-order-by={orderBy} src={arrow} alt="Ordenar" />
            </button>
            <Button onClick={handleNavigateToCreateContact}>
              Novo Contato
            </Button>
          </div>
        </header>
        {!contacts.length && (
          <p className={styles.emptyContacts}>Nenhum contato encontrado.</p>
        )}
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            data={contact}
            onDelete={handleDeleteContact}
          />
        ))}
      </section>
    </>
  );
}
