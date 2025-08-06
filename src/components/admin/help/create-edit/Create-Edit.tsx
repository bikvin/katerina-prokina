"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { RichTextEditor } from "@/components/common/richTextEditor/RichTextEditor";
import { useState } from "react";
import { createHelp } from "@/actions/help/create";
import { editHelp } from "@/actions/help/edit";

export default function CreateEditHelpForm({
  header,
  text,
  id,
  order,
  isEdit = false,
}: {
  header?: string;
  text?: string;
  id?: string;
  order?: number | null;
  isEdit?: boolean;
}) {
  const usedAction = isEdit ? editHelp : createHelp;

  const [formState, action] = useFormState(usedAction, {
    errors: {},
  });

  const startingText = isEdit && text ? text : ""; // if we have text set starting text to it

  const [editorValue, setEditorValue] = useState<string>(startingText);

  return (
    <form className={`admin-form`} action={action}>
      <div>
        <label htmlFor="header">Заголовок</label>

        <input name="header" type="text" defaultValue={header}></input>
        {formState.errors && (
          <div className="error">{formState.errors?.header?.join(", ")}</div>
        )}
      </div>

      <div>
        <label htmlFor="text">Текст</label>

        <RichTextEditor value={editorValue} setValue={setEditorValue} />
        {formState.errors && (
          <div className="error">{formState.errors?.text?.join(", ")}</div>
        )}
      </div>
      <div className="mt-8">
        <label htmlFor="order">Порядок показа:</label>
        <div className="w-16">
          <input
            name="order"
            type="number"
            defaultValue={order !== null ? order : ""}
          ></input>
        </div>
        {formState.errors && (
          <div className="error">{formState.errors?.order?.join(", ")}</div>
        )}
      </div>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}

      <div className="flex justify-center mt-4">
        <FormButton small={true}>
          {isEdit ? "Сохранить" : "Создать"} пункт
        </FormButton>
      </div>
      <input type="hidden" name="text" value={editorValue} />
      {isEdit && <input type="hidden" name="id" value={id} />}
    </form>
  );
}
