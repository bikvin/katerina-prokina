import { z } from "zod";

export const createHelpSchema = z.object({
  header: z.string().min(1, { message: "Заголовок не может быть пустым" }),
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  order: z.number().optional(), // Makes 'order' optional
});

export const editHelpSchema = z.object({
  header: z.string().min(1, { message: "Заголовок не может быть пустым" }),
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  order: z.number().optional(), // Makes 'order' optional
  id: z.string().cuid({ message: "Неверный id статьи" }),
});
