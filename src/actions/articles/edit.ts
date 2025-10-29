"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { editArticleSchema } from "@/zod/article";

interface EditArticleState {
  errors: {
    header?: string[];
    coverPhotoName?: string[];
    type?: string[];
    text?: string[];
    id?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function editArticle(
  formState: EditArticleState,
  formData: FormData
): Promise<EditArticleState> {
  // console.log("formData ", formData);

  const id = formData.get("id")?.toString() ?? "";
  const header = formData.get("header")?.toString() ?? "";
  const text = formData.get("text")?.toString() ?? "";
  const type = formData.get("type")?.toString() ?? "";
  const coverPhotoName = formData.get("coverPhotoName")?.toString() ?? "";
  const orderRaw = formData.get("order")?.toString();
  const parsedOrder = orderRaw ? Number(orderRaw) : undefined;

  const result = editArticleSchema.safeParse({
    id,
    header,
    coverPhotoName,
    text,
    type,
    order: parsedOrder,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.article.update({
      where: {
        id: result.data.id,
      },
      data: {
        header: result.data.header,
        coverPhotoName: result.data.coverPhotoName,
        htmlText: result.data.text,
        type: result.data.type,
        order: parsedOrder,
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

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath(`/articles/${result.data.id}`);

  redirect("/admin/articles");
}
