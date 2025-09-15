import { TopMenu } from "@/components/admin/topMenu/TopMenu";

import { EditImagesForm } from "@/components/admin/images/edit/editImagesForm";
import { db } from "@/db";

export default async function MovieclubImagesEditPage() {
  const IMAGE_GROUP = "movieclub";
  const SELECTED_IMAGES = 1;

  const MovieclubImages = await db.imageGroupArray.findUnique({
    where: { imageGroupName: IMAGE_GROUP },
  });

  const arrString = MovieclubImages ? MovieclubImages.fileNamesArr : "[]";

  const movieclubImagesData = JSON.parse(arrString);

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%] mx-auto`}>
          <h1 className="admin-form-header mt-10">Фото киноклуба</h1>
          <EditImagesForm
            imageData={movieclubImagesData}
            imageGroup={IMAGE_GROUP}
            selectedImages={SELECTED_IMAGES}
          />
        </div>
      </div>
    </>
  );
}
