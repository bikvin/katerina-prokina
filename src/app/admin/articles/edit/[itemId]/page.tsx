import CreateEditArticleForm from "@/components/admin/articles/form/Create-Edit";
import { TopMenu } from "@/components/admin/topMenu/TopMenu";
import { db } from "@/db";

export default async function EditArticlePage({
  params,
}: {
  params: { itemId: string };
}) {
  const IMAGE_GROUP = "articles";
  const itemId = params.itemId;

  const item = await db.article.findUnique({ where: { id: itemId } });

  if (!item) {
    throw new Error("Item not found");
  }

  const coverImageData = JSON.parse(item.coverPhotoName) || null;

  console.log("IMAGE_GROUP", IMAGE_GROUP);

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">Редактировать статью</h2>
          <CreateEditArticleForm
            header={item.header}
            imageData={coverImageData}
            htmlText={item.htmlText}
            id={item.id}
            order={item.order}
            isEdit={true}
            imageGroup={IMAGE_GROUP}
          />
        </div>
      </div>
    </>
  );
}
