import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { WhenNeeded } from "@prisma/client";
import DeleteDialog from "@/components/common/delete/DeleteDialog";
import { deleteWhenNeeded } from "@/actions/when-needed/delete";
import { RiEdit2Line } from "react-icons/ri";
import Link from "next/link";

export default function WhenNeededItem({
  whenNeeded,
}: {
  whenNeeded: WhenNeeded;
}) {
  const textObj = {
    __html: DOMPurify.sanitize(whenNeeded.text.substring(0, 200)) + "...",
  };

  return (
    <div
      key={whenNeeded.id}
      className="relative flex flex-col border mb-4 p-4 shadow-main"
    >
      <div className="absolute top-4 right-4 flex gap-2 flex-col">
        <DeleteDialog
          id={whenNeeded.id}
          action={deleteWhenNeeded}
          message={`Вы уверены, что хотите удалить пункт ${whenNeeded.header}`}
        />
        <Link className="" href={`/admin/when-needed/edit/${whenNeeded.id}`}>
          <RiEdit2Line className="w-6 h-6 hover:text-blue-700 hover:scale-125 cursor-pointer" />
        </Link>
      </div>

      <div className="p-4">
        <h4 className="gray-subheader mb-4">{whenNeeded.header}</h4>

        <div
          dangerouslySetInnerHTML={textObj}
          className="max-h-30 overflow-hidden"
        ></div>
      </div>

      {/* <div>
        <span className="font-light">Имя:</span> {contact.name}
      </div>
      <div>
        <span className="font-light">Контакт: </span>
        {contact.contact}
      </div>
      <div>
        <span className="font-light">Сообщение: </span>
        {contact.message}
      </div> */}
      <div className="self-end font-light text-sm">
        {new Intl.DateTimeFormat("ru-RU", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(whenNeeded.updatedAt))}
      </div>
    </div>
  );
}
