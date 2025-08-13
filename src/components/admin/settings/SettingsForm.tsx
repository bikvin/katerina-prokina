"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { editSettings } from "@/actions/settings/edit/editSettings";
import FormInput from "@/components/common/formInput";
import { settingsFieldsWithDividers, settingsType } from "./settingsFields";

export default function SettingsForm(props: settingsType) {
  const [formState, action] = useFormState(editSettings, {
    errors: {},
  });

  // console.log("settingsFields", settingsFields);

  let successMessage = null;
  if (formState.success) {
    successMessage = formState.success.message;
  }

  return (
    <form className={`admin-form`} action={action}>
      {settingsFieldsWithDividers.map((field, idx) =>
        field.divider ? (
          <div className="admin-horizontal-line" key={idx}></div>
        ) : (
          <FormInput
            key={field.name}
            name={field.name ?? ""}
            formState={formState}
            defaultValue={props[field.name as keyof typeof props] || ""}
          >
            {field.label}
          </FormInput>
        )
      )}

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}

      <div className="flex justify-center mt-10 mb-10">
        <FormButton successMessage={successMessage}>Сохранить</FormButton>
      </div>
    </form>
  );
}
