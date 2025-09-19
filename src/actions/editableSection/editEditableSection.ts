"use server";

import { db } from "@/db";

import { revalidatePath } from "next/cache";

import { editEditableSectionSchema } from "@/zod/editableSection";

interface EditEditableSectionState {
  errors?: {
    header?: string[];
    htmlText?: string[];
    key?: string[];
    id?: string[];
    revalidatepath?: string[];
    _form?: string[];
  };
  success?: {
    message?: string;
  };
}

export async function EditEditableSection(
  formState: EditEditableSectionState,
  formData: FormData
): Promise<EditEditableSectionState> {
  // console.log("formData ", formData);

  const result = editEditableSectionSchema.safeParse({
    key: formData.get("key"),
    header: formData.get("header"),
    htmlText: formData.get("htmlText"),
    revalidatepath: formData.get("revalidatepath"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // console.log(result);

  try {
    await db.editableSection.upsert({
      where: {
        key: result.data.key,
      },
      update: {
        header: result.data.header,
        htmlText: result.data.htmlText,
      },
      create: {
        key: result.data.key,
        header: result.data.header,
        htmlText: result.data.htmlText,
      },
    });
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

  revalidatePath(result.data.revalidatepath);
  revalidatePath("/");
  return {
    success: { message: "Сохранено" },
  };
}
