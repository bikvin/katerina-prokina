"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteHelpFormState {
  errors: {
    _form?: string[];
  };
}

export async function deleteHelp(
  formState: DeleteHelpFormState,
  formData: FormData
): Promise<DeleteHelpFormState> {
  const id = formData.get("id");

  if (!id) {
    throw new Error("Что-то пошло не так. Id не найден.");
  }

  if (typeof id !== "string") {
    throw new Error("Что-то пошло не так. Id нeверный.");
  }

  try {
    await db.help.delete({
      where: {
        id: id,
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

  revalidatePath("/admin/help");
  revalidatePath("/");

  redirect("/admin/help");
}
