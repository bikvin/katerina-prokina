import { TopMenu } from "@/components/admin/topMenu/TopMenu";
import CreateEditArticleForm from "@/components/admin/articles/form/Create-Edit";

export default function CreateArticlePage() {
  const IMAGE_GROUP = "articles";

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">Создать новую статью</h2>
          <CreateEditArticleForm imageGroup={IMAGE_GROUP} />
        </div>
      </div>
    </>
  );
}
