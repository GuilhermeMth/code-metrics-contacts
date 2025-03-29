import { z } from "zod";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  categoryId: "",
};

const validations = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z.union([z.string().email("O e-mail é invalido."), z.literal("")]),
  phone: z.union([
    z
      .string()
      .min(11, "O telefone deve ter no mínimo 11 caracteres.")
      .max(11, "O telefone deve ter no máximo 11 caracteres."),
    z.literal(""),
  ]),
  categoryId: z.string(),
});

export { defaultValues, validations };
