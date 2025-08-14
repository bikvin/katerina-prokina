import { settingsFieldsWithValidation } from "@/components/admin/settings/settingsFields";
import { z } from "zod";

const requiredString = z
  .string()
  .min(1, { message: "Значение не может быть пустым" });

const optionalString = z.string().optional().default("");

const settingsZodObj = Object.fromEntries(
  settingsFieldsWithValidation
    .filter(
      (field) =>
        field.validation === "required" || field.validation === "optional"
    )
    .map((field) => {
      if (field.validation === "required") {
        return [field.name, requiredString];
      } else {
        // optional
        return [field.name, optionalString];
      }
    })
);

export const editSettingsSchema = z.object(settingsZodObj);
