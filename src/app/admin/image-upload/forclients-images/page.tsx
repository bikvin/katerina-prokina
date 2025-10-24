import { TopMenu } from "@/components/admin/topMenu/TopMenu";

import { EditImagesForm } from "@/components/admin/images/edit/editImagesForm";
import { db } from "@/db";

export default async function ForClientsEditPage() {
  const IMAGE_GROUP = "forclients-hero";

  const forclientsImages = await db.imageGroupArray.findUnique({
    where: { imageGroupName: IMAGE_GROUP },
  });

  const SELECTED_IMAGES = 1;
  const MAX_IMAGES = 5;

  const arrString = forclientsImages ? forclientsImages.fileNamesArr : "[]";

  const forclientsImagesData = JSON.parse(arrString);

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%] mx-auto`}>
          <h1 className="admin-form-header mt-10">
            Главное фото для cтраницы Клиентам
          </h1>
          <EditImagesForm
            imageData={forclientsImagesData}
            imageGroup={IMAGE_GROUP}
            selectedImages={SELECTED_IMAGES}
            maxImages={MAX_IMAGES}
          />
        </div>
      </div>
    </>
  );
}
