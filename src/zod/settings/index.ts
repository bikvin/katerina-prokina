import { settingsFields } from "@/components/admin/settings/settingsFields";
import { z } from "zod";

const requiredString = z
  .string()
  .min(1, { message: "Значение не может быть пустым" });

const settingsZodObj = Object.fromEntries(
  settingsFields.map((field) => [field, requiredString])
);

export const editSettingsSchema = z.object(settingsZodObj);
