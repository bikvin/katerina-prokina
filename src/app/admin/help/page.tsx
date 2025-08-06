import HelpEditList from "@/components/admin/help/edit/helpEditList";
import Header from "@/components/admin/topMenu/topMenu";
import Link from "next/link";

export default function HelpPage() {
  return (
    <>
      <Header page="help" />
      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] mx-auto">
          <div className=" mt-10 flex justify-end">
            <Link
              className="link-button link-button-green"
              href="/admin/help/new"
            >
              Новый пункт
            </Link>
          </div>
          <HelpEditList />
        </div>
      </div>
    </>
  );
}
