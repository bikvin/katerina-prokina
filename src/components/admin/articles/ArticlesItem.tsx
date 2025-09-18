import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { Article } from "@prisma/client";
import DeleteDialog from "@/components/common/delete/DeleteDialog";
import { deleteArticle } from "@/actions/articles/delete";
import { RiEdit2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

export default function ArticlesItem({ article }: { article: Article }) {
  const textObj = {
    __html:
      DOMPurify.sanitize(
        article.htmlText.replace(/<img[^>]*>/g, "").substring(0, 200)
      ) + "...",
  };

  const fileName = JSON.parse(article.coverPhotoName).name || "";
  const imageLink = `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/articles-images/${fileName}`;

  return (
    <div
      key={article.id}
      className="relative flex flex-col border mb-4 p-4 shadow-main"
    >
      <div className="absolute top-4 right-4 flex gap-2 flex-col">
        <DeleteDialog
          id={article.id}
          action={deleteArticle}
          message={`Вы уверены, что хотите удалить статью ${article.header}`}
        />
        <Link className="" href={`/admin/articles/edit/${article.id}`}>
          <RiEdit2Line className="w-6 h-6 hover:text-blue-700 hover:scale-125 cursor-pointer" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-center">
        <div className="relative aspect-[calc(3/2)] min-w-[calc(20%)] ">
          <Image
            src={imageLink}
            alt="article image"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="gray-subheader mb-4">{article.header}</h4>

          <div
            dangerouslySetInnerHTML={textObj}
            className="max-h-30 overflow-hidden"
          ></div>
        </div>
      </div>

      <div className="self-end font-light text-sm">
        {new Intl.DateTimeFormat("ru-RU", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(article.updatedAt))}
      </div>
    </div>
  );
}
