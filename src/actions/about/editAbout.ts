"use server";

import { db } from "@/db";
import { editAboutSchema } from "@/zod/about";

import { revalidatePath } from "next/cache";

interface EditAboutFormState {
  errors?: {
    text?: string[];
    squareNumber?: string[];
    _form?: string[];
  };
  success?: {
    message?: string;
  };
}

export async function editAbout(
  formState: EditAboutFormState,
  formData: FormData
): Promise<EditAboutFormState> {
  const text = formData.get("text");
  const squareNumber = formData.get("squareNumber");

  console.log("text", text);
  console.log("sqareNumber", squareNumber);

  if (!squareNumber) {
    return {
      errors: {
        _form: ["Something went wrong with square number"],
      },
    };
  }

  const result = editAboutSchema.safeParse({
    text: text,
    squareNumber: +squareNumber,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    console.log("here?");

    await db.about.upsert({
      where: { squareNumber: result.data.squareNumber },
      update: { text: result.data.text },
      create: {
        squareNumber: result.data.squareNumber,
        text: result.data.text,
      },
    });

    console.log("here");
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath("/");
  revalidatePath("/admin/about");
  return {
    success: { message: "Сохранено" },
  };
}
