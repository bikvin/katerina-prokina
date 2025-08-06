"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { editWhenNeededSchema } from "@/zod/when-needed";
import { revalidatePath } from "next/cache";

interface EditWhenNeededState {
  errors: {
    header?: string[];
    text?: string[];
    id?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function editWhenNeeded(
  formState: EditWhenNeededState,
  formData: FormData
): Promise<EditWhenNeededState> {
  // console.log("formData ", formData);

  const order = formData.get("order");
  const parsedOrder = order ? Number(order) : undefined;

  const result = editWhenNeededSchema.safeParse({
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
    await db.whenNeeded.update({
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

  revalidatePath("/admin/when-needed");
  revalidatePath("/");

  redirect("/admin/when-needed");
}
