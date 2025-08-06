"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { deleteHelp } from "@/actions/help/delete";

export default function DeleteHelpForm(props: { id: string }) {
  const [formState, action] = useFormState(deleteHelp, {
    errors: {},
  });
  return (
    <form action={action}>
      <FormButton color={"red"} small={true}>
        Удалить
      </FormButton>
      <input type="hidden" name="id" value={props.id} />
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
    </form>
  );
}
