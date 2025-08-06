"use server";

import { db } from "@/db";
import { createWhenNeededSchema } from "@/zod/when-needed";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateWhenNeededFormState {
  errors: {
    header?: string[];
    text?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function createWhenNeeded(
  formState: CreateWhenNeededFormState,
  formData: FormData
): Promise<CreateWhenNeededFormState> {
  try {
    const header = formData.get("header");

    const text = formData.get("text");

    const order = formData.get("order");
    const parsedOrder = order ? Number(order) : undefined;

    const result = createWhenNeededSchema.safeParse({
      header: header,
      text: text,
      order: parsedOrder,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db.whenNeeded.create({
      data: {
        header: result.data.header,
        text: result.data.text,
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

  revalidatePath("/admin/when-needed");
  revalidatePath("/");

  redirect("/admin/when-needed");
}
