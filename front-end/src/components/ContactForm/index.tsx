import { IContactFormProps, IContactFormValues } from "./types";
import styles from "./styles.module.css";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { defaultValues, validations } from "./validations";
import Input from "../Input";
import FormGroup from "../FormGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../Select";
import { useEffect, useState } from "react";
import { ICategory } from "../../@types/Category";
import { CategoriesService } from "../../services";
import Loader from "../Loader";
import { useNavigate } from "react-router";

export default function ContactForm({
  title,
  buttonLabel,
  initialValues,
  onSubmit,
}: IContactFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactFormValues>({
    defaultValues,
    resolver: zodResolver(validations),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        const categories = await CategoriesService.getCategories();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleSubmitFrom = handleSubmit(async (values) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  });

  function handleNavigateBack() {
    navigate("/");
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <form className={styles.form} onSubmit={handleSubmitFrom}>
        <h2>{title}</h2>
        <FormGroup error={errors.name}>
          <Input name="name" register={register} placeholder="Nome" />
        </FormGroup>
        <FormGroup error={errors.email}>
          <Input name="email" register={register} placeholder="E-mail" />
        </FormGroup>
        <FormGroup error={errors.phone}>
          <Input name="phone" register={register} placeholder="Telefone" />
        </FormGroup>
        <FormGroup error={errors.categoryId}>
          <Select
            name="categoryId"
            register={register}
            options={categories}
            optionLabelKey="name"
            optionValueKey="id"
            optionKeyExtractor="id"
          />
        </FormGroup>
        <div>
          <Button type="button" onClick={handleNavigateBack}>
            Voltar
          </Button>
          <Button>{buttonLabel}</Button>
        </div>
      </form>
    </>
  );
}
