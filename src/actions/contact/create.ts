"use server";

import { db } from "@/db";
import { sendContactRequestEmail } from "@/lib/resend/mail";
import { sendTelegramMessage } from "@/lib/telegram/sendMessage";
import { createContactSchema } from "@/zod/contact";
import { revalidatePath } from "next/cache";

interface CreateContactFormState {
  errors?: {
    name?: string[];
    contact?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: {
    message?: string;
  };
}

const fields = ["name", "contact", "message"] as const;
type Field = (typeof fields)[number];

export async function createContact(
  formState: CreateContactFormState,
  formData: FormData
): Promise<CreateContactFormState> {
  try {
    const formValues = Object.fromEntries(
      fields.map((field) => [field, formData.get(field) ?? ""])
    ) as Record<Field, string>;

    const result = createContactSchema.safeParse(formValues);

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    await db.contact.create({
      data: result.data,
    });

    await sendContactRequestEmail(
      result.data.name,
      result.data.contact,
      result.data.message || ""
    );

    sendTelegramMessage(
      result.data.name,
      result.data.contact,
      result.data.message || ""
    );
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

  revalidatePath("/admin");

  return {
    success: { message: "Сообщение отправлено" },
  };
}
