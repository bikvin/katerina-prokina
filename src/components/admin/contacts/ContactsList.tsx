import { Contact } from "@prisma/client";
import React from "react";

export default function ContactsList({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex flex-col border mb-4 p-4 shadow-main"
        >
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
      ))}
    </div>
  );
}
