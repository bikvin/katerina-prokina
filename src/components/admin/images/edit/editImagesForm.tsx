"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";

import { useState } from "react";
// import { EditParallaxImages } from "@/actions/parallax-images/edit/editParallaxImages";
import { EditImagesAction } from "@/actions/images/edit/editImagesAction";
import DropzoneInput from "@/components/admin/images/dropzone/dropzoneInput";
import { ImageObj } from "./ImageObjInterface";

export function EditImagesForm({
  imageData,
  imageGroup,
}: {
  imageData: ImageObj[];
  imageGroup: string;
}) {
  const [formState, action] = useFormState(EditImagesAction, {
    errors: {},
  });

  const successMessage = formState.success ? formState.success.message : null;

  const [photoNames, setPhotoNames] = useState(imageData);

  return (
    <form className={`adminForm mb-10`} action={action}>
      <div>
        <DropzoneInput
          photoNames={photoNames}
          setPhotoNames={setPhotoNames}
          dirName={`${imageGroup}-images`}
        />
      </div>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
      {formState.errors && (
        <div className="error">
          {formState.errors?.imagesArrString?.join(", ")}
        </div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?.imageGroup?.join(", ")}</div>
      )}

      <input
        type="hidden"
        name="imagesArrString"
        value={JSON.stringify(photoNames)}
      />

      <input type="hidden" name="imageGroup" value={imageGroup} />

      <FormButton successMessage={successMessage}>Сохранить</FormButton>
    </form>
  );
}
