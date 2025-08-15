import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";
import Link from "next/link";
import DeleteForm from "@/components/common/delete/deleteForm";
import { deleteWhenNeeded } from "@/actions/when-needed/delete";

export default async function DeleteWhenNeededPage({
  params,
}: {
  params: { itemId: string };
}) {
  const item = await db.whenNeeded.findUnique({
    where: { id: params.itemId },
  });

  if (!item) {
    throw new Error("Accordion item not found");
  }

  return (
    <>
      <Header page="help" />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`card w-1/2 mt-20 mx-auto mb-10`}>
          <h2 className="text-xl">
            Вы уверены, что хотите удалить пункт:{" "}
            <span className={"gray-subheader"}>{item.header}</span> ?
          </h2>
          <div className="flex justify-center gap-4 mt-10">
            <div>
              {/* <DeleteWhenNeededForm id={item.id} /> */}
              <DeleteForm id={item.id} receivedAction={deleteWhenNeeded} />
            </div>
            <div>
              <Link
                className={`link-button link-button-gray`}
                href={"/admin/when-needed"}
              >
                Отмена
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
