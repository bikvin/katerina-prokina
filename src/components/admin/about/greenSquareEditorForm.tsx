"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { RichTextEditor } from "@/components/common/richTextEditor/RichTextEditor";
import { useState } from "react";
import { editAbout } from "@/actions/about/editAbout";
import React from "react";

export default function GreenSquareEditorForm({
  startingText,
  squareNumber,
}: {
  startingText: string;
  squareNumber: number;
}) {
  const [formState, action] = useFormState(editAbout, {
    errors: {},
  });
  const [editorValue, setEditorValue] = useState<string>(startingText);

  return (
    <form className={`admin-form mb-10`} action={action}>
      <div>
        <label className="font-bold" htmlFor="text">
          Квадрат {squareNumber}
        </label>

        <RichTextEditor value={editorValue} setValue={setEditorValue} />
        {formState.errors && (
          <div className="error">{formState.errors?.text?.join(", ")}</div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <FormButton small={true} successMessage={formState.success?.message}>
          Сохранить
        </FormButton>
      </div>

      {formState.errors && (
        <div className="error">
          {formState.errors?.squareNumber?.join(", ")}
        </div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
      <input type="hidden" name="text" value={editorValue} />
      <input type="hidden" name="squareNumber" value={squareNumber} />
    </form>
  );
}
