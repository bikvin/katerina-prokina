import { TopMenu } from "@/components/admin/topMenu/TopMenu";
import { db } from "@/db";

import { EditableSection } from "@prisma/client";
import EditableSectionForm from "@/components/admin/editableSetion/EditableSectionForm";

export default async function ForClientsPage() {
  const IMAGE_GROUP = "forclients";

  let forClientsData: EditableSection | null = null;

  try {
    const data = await db.editableSection.findUnique({
      where: { key: "forclients" },
    });

    if (data) {
      forClientsData = data;
    }
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <TopMenu />

      <div className="max-w-screen-lg mx-auto mb-10">
        <div className="w-[90%] md:w-2/3 mx-auto">
          <h1 className="admin-form-header mt-10">Клиентам</h1>
          <EditableSectionForm
            header={forClientsData?.header || null}
            htmlText={forClientsData?.htmlText || null}
            imageGroup={IMAGE_GROUP}
            sectionKey="forclients"
            revalidatepath="/admin/forclients"
          />
        </div>
      </div>
    </>
  );
}
