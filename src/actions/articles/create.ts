"use server";

import { db } from "@/db";
import { createArticleSchema } from "@/zod/article";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateArticleFormState {
  errors: {
    header?: string[];
    coverPhotoName?: string[];
    text?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function createArticle(
  formState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> {
  try {
    const header = formData.get("header");
    const text = formData.get("text");
    const order = formData.get("order");
    const coverPhotoName = formData.get("coverPhotoName");

    const parsedOrder = order ? Number(order) : undefined;

    const result = createArticleSchema.safeParse({
      header: header,
      coverPhotoName: coverPhotoName,
      text: text,
      order: parsedOrder,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db.article.create({
      data: {
        header: result.data.header,
        coverPhotoName: result.data.coverPhotoName,
        htmlText: result.data.text,
        order: result.data.order,
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
        errors: { _form: ["Что-то пошло не так"] },
      };
    }
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");

  redirect("/admin/articles");
}
