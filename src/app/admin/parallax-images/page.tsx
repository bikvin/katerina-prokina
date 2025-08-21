import TopMenu from "@/components/admin/topMenu/topMenu";

import { EditImagesForm } from "@/components/admin/images/edit/editImagesForm";
import { db } from "@/db";

export default async function ParallaxImagesEditPage() {
  const IMAGE_GROUP = "parallax";

  const parallaxImages = await db.imageGroupArray.findUnique({
    where: { imageGroupName: IMAGE_GROUP },
  });

  const arrString = parallaxImages ? parallaxImages.fileNamesArr : "[]";

  const parallaxImagesData = JSON.parse(arrString);

  return (
    <>
      <TopMenu page="parallaxImages" />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%] mx-auto`}>
          <h1 className="admin-form-header mt-10">Фото для фона</h1>
          <EditImagesForm
            imageData={parallaxImagesData}
            imageGroup={IMAGE_GROUP}
          />
        </div>
      </div>
    </>
  );
}
