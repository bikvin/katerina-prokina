// import WhenNeededEditList from "@/components/admin/when-needed/edit/whenNeededEditList";
import ArticlesEditList from "@/components/admin/articles/ArticlesEditList";
import { TopMenu } from "@/components/admin/topMenu/TopMenu";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] mx-auto">
          <div className=" mt-10 flex justify-end">
            <Link
              className="link-button link-button-green"
              href="/admin/articles/new"
            >
              Новая статья
            </Link>
          </div>
          <ArticlesEditList />
        </div>
      </div>
    </>
  );
}
