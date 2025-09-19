import { z } from "zod";

export const editEditableSectionSchema = z.object({
  header: z.string().min(1, { message: "Заголовок не может быть пустым" }),
  htmlText: z.string().min(1, { message: "Содержание не может быть пустым" }),
  key: z.string().min(1, { message: "Ключ не может быть пустым" }),
  revalidatepath: z.string().min(1, { message: "RevalidatePath не найден" }),
  order: z.number().optional(), // Makes 'order' optional
});
