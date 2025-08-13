import React from "react";

export default function FormInput({
  children,
  name,
  defaultValue,
  formState,
  placeHolder,
}: {
  children?: React.ReactNode;
  name: string;
  defaultValue?: string;
  formState: any;
  placeHolder?: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{children}</label>

      <input
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeHolder}
      ></input>
      {formState.errors && (
        <div className="error">{formState.errors[name]?.join(", ")}</div>
      )}
    </div>
  );
}
