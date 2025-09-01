"use server";

import { DeleteFormState } from "@/components/common/delete/deleteTypes";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteArticle(
  _formState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return {
      errors: {
        _form: ["Что-то пошло не так. Id не найден или неверный."],
      },
    };
  }

  try {
    await db.article.delete({
      where: {
        id: id,
      },
    });
  } catch (err: unknown) {
    return {
      errors: {
        _form: [err instanceof Error ? err.message : "Something went wrong"],
      },
    };
  }

  revalidatePath("/admin/articles");
  revalidatePath("/");

  redirect("/admin/articles");
}
