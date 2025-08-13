import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Пожалуйста укажите как можно к вам обращаться" }),
  contact: z
    .string()
    .min(1, { message: "Пожалуйста укажите как с вами связаться" }),
  message: z.string().optional(),
});
