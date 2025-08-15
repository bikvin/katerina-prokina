import { Contact } from "@prisma/client";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function ContactsList({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="relative flex flex-col border mb-4 p-4 shadow-main"
        >
          {/* <div>
            <RxCross2 className="absolute top-4 right-4 w-6 h-6 hover:text-red-700 hover:scale-125 cursor-pointer" />
          </div> */}
          <Dialog>
            <DialogTrigger>
              <RxCross2 className="absolute top-4 right-4 w-6 h-6 hover:text-red-700 hover:scale-125 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="!rounded-none">
              <DialogHeader>
                <DialogTitle>
                  Вы уверены, что хотите удалить заявку?
                </DialogTitle>
                <DialogDescription>
                  <Link
                    className="link-button link-button-gray"
                    href={`/admin/when-needed`}
                  >
                    Отмена
                  </Link>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
