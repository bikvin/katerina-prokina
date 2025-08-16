"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";

import { useState } from "react";
import { editParallaxImages } from "@/actions/parallax-images/edit";
import DropzoneInput from "@/components/admin/parallax-images/dropzone/dropzoneInput";

interface ParallaxImage {
  name: string;
  id: string;
}

export default function EditParallaxImagesForm({
  parallaxImageData,
}: {
  parallaxImageData: ParallaxImage[];
}) {
  const [formState, action] = useFormState(editParallaxImages, {
    errors: {},
  });

  const [arrString, setArrString] = useState(JSON.stringify(parallaxImageData));

  const updateArrString = (parallaxImageArray: ParallaxImage[]) => {
    setArrString(JSON.stringify(parallaxImageArray));
  };

  return (
    <form className={`adminForm`} action={action}>
      <div>
        <DropzoneInput
          dbSavedFileNames={parallaxImageData}
          updateArrString={updateArrString}
        />
      </div>

      <FormButton>Сохранить</FormButton>
      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?.imagesArr?.join(", ")}</div>
      )}
      {formState.errors && (
        <div className="error">{formState.errors?.id?.join(", ")}</div>
      )}

      <input type="hidden" name="imagesArr" value={arrString} />
    </form>
  );
}
