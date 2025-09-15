"use server";

import { DeleteFormState } from "@/components/common/delete/deleteTypes";
import { db } from "@/db";
import { deleteArticleImagesFromS3 } from "@/lib/awsS3/deleteArticleImagesFromS3";
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
    const article = await db.article.findUnique({ where: { id: id } });

    if (!article) throw new Error("Article now found");

    try {
      await deleteArticleImagesFromS3(article.htmlText);
    } catch (s3Err) {
      console.error("⚠️ Failed to delete images from S3:", s3Err);
      // continue with DB deletion anyway
    }

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
