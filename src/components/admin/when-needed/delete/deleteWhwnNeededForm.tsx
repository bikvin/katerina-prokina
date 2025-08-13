"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { deleteWhenNeeded } from "@/actions/when-needed/delete";

export default function DeleteWhenNeededForm(props: { id: string }) {
  const [formState, action] = useFormState(deleteWhenNeeded, {
    errors: {},
  });
  return (
    <form action={action}>
      <FormButton color={"red"} size="small">
        Удалить
      </FormButton>
      <input type="hidden" name="id" value={props.id} />
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
    </form>
  );
}
