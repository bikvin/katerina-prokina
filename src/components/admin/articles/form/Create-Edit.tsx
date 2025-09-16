"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";
import { useState } from "react";
import { createArticle } from "@/actions/articles/create";
import { editArticle } from "@/actions/articles/edit";
import { RichTextEditorImages } from "@/components/common/richTextEditor/RichTextEditorImages";
import DropzoneInputSingleImage from "../../images/dropzone/dropzoneInputSingleImage";
import { ImageObj } from "../../images/edit/ImageObjInterface";

export default function CreateEditArticleForm({
  header,
  imageData = null,
  htmlText,
  id,
  order,
  isEdit = false,
  imageGroup,
}: {
  header?: string;
  imageData?: ImageObj | null;
  htmlText?: string;
  id?: string;
  order?: number | null;
  isEdit?: boolean;
  imageGroup: string;
}) {
  const usedAction = isEdit ? editArticle : createArticle;

  const [formState, action] = useFormState(usedAction, {
    errors: {},
  });

  const [photoName, setPhotoName] = useState<ImageObj | null>(imageData);

  const startingText = isEdit && htmlText ? htmlText : ""; // if we have text set starting text to it

  const [editorValue, setEditorValue] = useState<string>(startingText);

  return (
    <form className={`admin-form`} action={action}>
      <div className="mb-8">
        <label htmlFor="header">Заголовок</label>

        <input name="header" type="text" defaultValue={header}></input>
        {formState.errors && (
          <div className="error">{formState.errors?.header?.join(", ")}</div>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="header">Картинка для обложки</label>
        <DropzoneInputSingleImage
          photoName={photoName}
          setPhotoName={setPhotoName}
          dirName={`${imageGroup}-images`}
        />
        {formState.errors && (
          <div className="error">
            {formState.errors?.coverPhotoName?.join(", ")}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="text">Текст</label>

        <RichTextEditorImages value={editorValue} setValue={setEditorValue} />
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
        <FormButton size="small">
          {isEdit ? "Сохранить" : "Создать"} статью
        </FormButton>
      </div>
      <input type="hidden" name="text" value={editorValue} />
      <input
        type="hidden"
        name="coverPhotoName"
        value={photoName ? JSON.stringify(photoName) : ""}
      />
      {isEdit && <input type="hidden" name="id" value={id} />}
    </form>
  );
}
