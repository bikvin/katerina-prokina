import { z } from "zod";

export const editAboutSchema = z.object({
  text: z.string().min(1, { message: "Значение не может быть пустым" }),
  squareNumber: z.number(),
});
