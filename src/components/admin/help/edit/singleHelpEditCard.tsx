import Link from "next/link";
// import classes from "./accordionItemsEdit.module.css";

export default function SingleHelpEditCard({
  id,
  header,
  text,
}: {
  id: string;
  header: string;
  text: string;
}) {
  const textObj = { __html: text.substring(0, 200) + "..." }; // this object is needed for dangerouslySetInnerHTML. We keep only first 100 characters

  return (
    <div
      className={
        "flex flex-col md:flex-row justify-between px-10 py-5 border-b"
      }
    >
      <div className={""}>
        <h3 className="gray-subheader mb-4">{header}</h3>

        <div
          dangerouslySetInnerHTML={textObj}
          className="max-h-30 overflow-hidden"
        ></div>
      </div>
      <div className={`mt-8 md:mt-0`}>
        <Link
          className="link-button link-button-blue mb-2"
          href={`/admin/help/edit/${id}`}
        >
          Редактировать
        </Link>

        <Link
          className="link-button link-button-red"
          href={`/admin/help/delete/${id}`}
        >
          Удалить
        </Link>
      </div>
    </div>
  );
}
