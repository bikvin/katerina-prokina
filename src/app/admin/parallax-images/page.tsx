import TopMenu from "@/components/admin/topMenu/topMenu";

import EditParallaxImagesForm from "@/components/admin/parallax-images/edit/editParallaxImagesForm";
import { db } from "@/db";

export default async function ProjectsEditPage() {
  const parallaxImages = await db.parallaxImage.findUnique({
    where: { id: 1 },
  });

  let arrString = "[]"; // if no values set it to empty array
  if (parallaxImages) {
    arrString = parallaxImages.fileNamesArr;
  }

  const parallaxImagesData = JSON.parse(arrString);

  return (
    <>
      <TopMenu page="parallaxImages" />
      <div className="max-w-screen-lg mx-auto ">
        <div className={`adminFormContainer w-[80%] mx-auto`}>
          <h1 className="admin-form-header mt-10">Фото для фона</h1>
          <EditParallaxImagesForm parallaxImageData={parallaxImagesData} />
        </div>
      </div>
    </>
  );
}
