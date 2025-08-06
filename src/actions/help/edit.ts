"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { editHelpSchema } from "@/zod/help";
import { revalidatePath } from "next/cache";

interface EditHelpState {
  errors: {
    header?: string[];
    text?: string[];
    id?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function editHelp(
  formState: EditHelpState,
  formData: FormData
): Promise<EditHelpState> {
  // console.log("formData ", formData);

  const order = formData.get("order");
  const parsedOrder = order ? Number(order) : undefined;

  const result = editHelpSchema.safeParse({
    id: formData.get("id"),
    header: formData.get("header"),
    text: formData.get("text"),
    order: parsedOrder,
  });

  // console.log(result.error);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // console.log(result);

  try {
    await db.help.update({
      where: {
        id: result.data.id,
      },
      data: {
        header: result.data.header,
        text: result.data.text,
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

  revalidatePath("/admin/help");
  revalidatePath("/");

  redirect("/admin/help");
}
