"use client";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/formButton";

import FormInput from "@/components/common/formInput";
import { createContact } from "@/actions/contact/create";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [formKey, setFormKey] = useState(0);

  const [formState, action] = useFormState(createContact, {
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setFormKey((prev) => prev + 1);
    }
  }, [formState]);

  return (
    <form key={formKey} className={`user-form mb-10`} action={action}>
      <FormInput
        name="name"
        formState={formState}
        defaultValue=""
        placeHolder="Ваше имя"
      ></FormInput>

      <FormInput
        name="contact"
        formState={formState}
        defaultValue=""
        placeHolder="Ваш контакт (WhatsApp, Telegram, телефон, email)"
      ></FormInput>

      <div>
        {/* <label htmlFor="message">Ваш запрос</label> */}
        <textarea name="message" placeholder="Ваш запрос"></textarea>
        {formState.errors && (
          <div className="error">{formState.errors["message"]?.join(", ")}</div>
        )}
      </div>

      <div className="">
        <FormButton
          type="user"
          color="redGradient"
          size="user"
          successMessage={formState.success?.message}
          className="mt-4"
        >
          Отправить сообщение
        </FormButton>
      </div>

      {formState.errors && (
        <div className="error">{formState.errors?._form?.join(", ")}</div>
      )}
    </form>
  );
}
