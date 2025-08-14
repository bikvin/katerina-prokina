"use server";

import { db } from "@/db";
import { editSettingsSchema } from "@/zod/settings";
import {
  settingsFields,
  settingsType,
} from "@/components/admin/settings/settingsFields";
import { revalidatePath } from "next/cache";
import { cleanTelegramChats } from "@/lib/telegram/cleanTelegramChats";

type SettingsErrorFields = Partial<
  Record<keyof settingsType | "_form", string[]>
>;

interface EditSettingsFormState {
  errors?: SettingsErrorFields;
  success?: {
    message?: string;
  };
}

export async function editSettings(
  formState: EditSettingsFormState,
  formData: FormData
): Promise<EditSettingsFormState> {
  const data = Object.fromEntries(
    settingsFields.map((field) => [field, formData.get(field)])
  );

  const result = editSettingsSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await Promise.all(
      settingsFields.map((field) =>
        db.settings.upsert({
          where: { field },
          update: { value: result.data[field] },
          create: {
            field,
            value: result.data[field],
          },
        })
      )
    );

    cleanTelegramChats(result.data.allowedTelegramAccounts); // this is no remove telegram chats that are not allowed anymore from the table
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
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return {
    success: { message: "Сохранено" },
  };
}
