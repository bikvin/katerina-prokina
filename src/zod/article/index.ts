import { z } from "zod";

export const createArticleSchema = z.object({
  header: z.string().min(1, { message: "Заголовок не может быть пустым" }),
  coverPhotoName: z
    .string()
    .min(1, { message: "Нужно изображение для обложки" }),
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  order: z.number().optional(), // Makes 'order' optional
});

export const editArticleSchema = z.object({
  header: z.string().min(1, { message: "Заголовок не может быть пустым" }),
  coverPhotoName: z
    .string()
    .min(1, { message: "Нужно изображение для обложки" }),
  text: z.string().min(1, { message: "Содержание не может быть пустым" }),
  order: z.number().optional(), // Makes 'order' optional
  id: z.string().cuid({ message: "Неверный id статьи" }),
});
