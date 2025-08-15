"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Contact } from "@prisma/client";
import { deleteContact } from "@/actions/contact/delete";
import DeleteForm from "@/components/common/delete/deleteForm";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

export default function DeleteContactDialog({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <RxCross2 className="absolute top-4 right-4 w-6 h-6 hover:text-red-700 hover:scale-125 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="!rounded-none">
        <DialogHeader>
          <DialogTitle>
            {`Вы уверены, что хотите удалить заявку от ${contact.name}?`}
          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-center gap-8 mt-8">
              <DeleteForm id={contact.id} receivedAction={deleteContact} />
              <div
                className="link-button link-button-gray"
                onClick={() => setOpen(false)}
              >
                Отмена
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
