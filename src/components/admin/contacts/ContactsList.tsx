import { Contact } from "@prisma/client";
import React from "react";

import ContactItem from "./ContactItem";

export default function ContactsList({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="">
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </div>
  );
}
