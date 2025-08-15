import React from "react";

import { Contact } from "@prisma/client";
import DeleteContactDialog from "./DeleteContactDialog";

export default function ContactItem({ contact }: { contact: Contact }) {
  return (
    <div
      key={contact.id}
      className="relative flex flex-col border mb-4 p-4 shadow-main"
    >
      <DeleteContactDialog contact={contact} />

      <div>
        <span className="font-light">Имя:</span> {contact.name}
      </div>
      <div>
        <span className="font-light">Контакт: </span>
        {contact.contact}
      </div>
      <div>
        <span className="font-light">Сообщение: </span>
        {contact.message}
      </div>
      <div className="self-end font-light text-sm">
        {new Intl.DateTimeFormat("ru-RU", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(contact.createdAt))}
      </div>
    </div>
  );
}
