"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { DeleteFormState } from "./deleteTypes";

export default function DeleteForm({
  id,
  receivedAction,
}: {
  id: string;
  receivedAction: (
    formState: DeleteFormState,
    formData: FormData
  ) => Promise<DeleteFormState>;
}) {
  const [formState, action] = useFormState(receivedAction, {
    errors: {},
  });
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <FormButton color={"red"} size="small">
        Удалить
      </FormButton>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
    </form>
  );
}
