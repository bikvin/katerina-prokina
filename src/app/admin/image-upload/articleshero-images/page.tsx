import { TopMenu } from "@/components/admin/topMenu/TopMenu";

import { EditImagesForm } from "@/components/admin/images/edit/editImagesForm";
import { db } from "@/db";

export default async function AvatarImagesEditPage() {
  const IMAGE_GROUP = "article-hero";

  const articleheroImages = await db.imageGroupArray.findUnique({
    where: { imageGroupName: IMAGE_GROUP },
  });

  const SELECTED_IMAGES = 1;
  const MAX_IMAGES = 5;

  const arrString = articleheroImages ? articleheroImages.fileNamesArr : "[]";

  const articleheroImagesData = JSON.parse(arrString);

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%] mx-auto`}>
          <h1 className="admin-form-header mt-10">
            Главное фото для cтраницы статьи
          </h1>
          <EditImagesForm
            imageData={articleheroImagesData}
            imageGroup={IMAGE_GROUP}
            selectedImages={SELECTED_IMAGES}
            maxImages={MAX_IMAGES}
          />
        </div>
      </div>
    </>
  );
}
