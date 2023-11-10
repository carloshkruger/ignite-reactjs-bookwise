import { z } from "zod";

export const reviewSchema = z
  .object({
    description: z
      .string({ required_error: "Informe o conteúdo da avaliação." })
      .trim()
      .min(1, { message: "Informe o conteúdo da avaliação." }),
    rate: z
      .number({ required_error: "Selecione a quantidade de estrelas." })
      .min(1, { message: "Selecione ao menos 1 estrela" })
      .max(5, { message: 'Selecione no máximo 5 estrelas' }),
  })
  .required({ description: true, rate: true });

export type ReviewSchemaType = z.infer<typeof reviewSchema>;