"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { useState } from "react";

import { RichTextEditorImages } from "@/components/common/richTextEditor/RichTextEditorImages";
import { EditEditableSection } from "@/actions/editableSection/editEditableSection";

export default function EditableSectionForm({
  header,
  htmlText,
  imageGroup,
  sectionKey,
  revalidatepath,
}: {
  header: string | null;
  htmlText: string | null;
  imageGroup: string;
  sectionKey: string;
  revalidatepath: string;
}) {
  const [formState, action] = useFormState(EditEditableSection, {
    errors: {},
  });

  const startingHeader = header ? header : "";
  const startingText = htmlText ? htmlText : ""; // if we have text set starting text to it

  const [editorValue, setEditorValue] = useState<string>(startingText);

  const successMessage = formState.success ? formState.success.message : null;

  return (
    <form className={`admin-form`} action={action}>
      <div className="mb-8">
        <label htmlFor="header">Заголовок</label>

        <input name="header" type="text" defaultValue={startingHeader}></input>
        {formState.errors && (
          <div className="error">{formState.errors?.header?.join(", ")}</div>
        )}
      </div>

      <div>
        <label htmlFor="htmlText">Текст</label>

        <RichTextEditorImages
          value={editorValue}
          setValue={setEditorValue}
          imageGroup={imageGroup}
        />
        {formState.errors && (
          <div className="error">{formState.errors?.htmlText?.join(", ")}</div>
        )}
        {formState.errors && (
          <div className="error">{formState.errors?.key?.join(", ")}</div>
        )}
        {formState.errors && (
          <div className="error">
            {formState.errors?.revalidatepath?.join(", ")}
          </div>
        )}
      </div>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
      <div className="flex justify-center mt-4">
        <FormButton successMessage={successMessage}>Сохранить</FormButton>
      </div>
      <input type="hidden" name="htmlText" value={editorValue} />
      <input type="hidden" name="key" value={sectionKey} />
      <input type="hidden" name="revalidatepath" value={revalidatepath} />
    </form>
  );
}
