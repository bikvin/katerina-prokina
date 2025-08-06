import CreateEditWhenNeededForm from "@/components/admin/when-needed/create-edit/Create-Edit";
import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";

export default async function EditWhenNeededPage({
  params,
}: {
  params: { itemId: string };
}) {
  const itemId = params.itemId;

  const item = await db.whenNeeded.findUnique({ where: { id: itemId } });

  if (!item) {
    throw new Error("Item not found");
  }

  return (
    <>
      <Header page="whenNeeded" />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">Редактировать пункт</h2>
          <CreateEditWhenNeededForm
            header={item.header}
            text={item.text}
            id={item.id}
            order={item.order}
            isEdit={true}
          />
        </div>
      </div>
    </>
  );
}
