import CreateEditHelpForm from "@/components/admin/help/create-edit/Create-Edit";
import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";

export default async function EditHelpPage({
  params,
}: {
  params: { itemId: string };
}) {
  const itemId = params.itemId;

  const item = await db.help.findUnique({ where: { id: itemId } });

  if (!item) {
    throw new Error("Item not found");
  }

  return (
    <>
      <Header page="help" />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">
            Редактировать пункт о помощи
          </h2>
          <CreateEditHelpForm
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
