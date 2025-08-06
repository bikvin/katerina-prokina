"use server";

import { db } from "@/db";
import { createHelpSchema } from "@/zod/help";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateAccordionItemsFormState {
  errors: {
    header?: string[];
    text?: string[];
    order?: string[];
    _form?: string[];
  };
}

export async function createHelp(
  formState: CreateAccordionItemsFormState,
  formData: FormData
): Promise<CreateAccordionItemsFormState> {
  try {
    const header = formData.get("header");

    const text = formData.get("text");

    const order = formData.get("order");
    const parsedOrder = order ? Number(order) : undefined;

    const result = createHelpSchema.safeParse({
      header: header,
      text: text,
      order: parsedOrder,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db.help.create({
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

  revalidatePath("/admin/help");
  revalidatePath("/");

  redirect("/admin/help");
}
