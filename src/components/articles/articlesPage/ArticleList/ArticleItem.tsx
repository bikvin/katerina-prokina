import React from "react";
// import DOMPurify from "isomorphic-dompurify";
import { Article } from "@prisma/client";

import Link from "next/link";
import Image from "next/image";
import DarkRedButton from "@/components/common/darkRedButton";

export default function ArticleItem({ article }: { article: Article }) {
  const fileName = JSON.parse(article.coverPhotoName).name || "";
  const imageLink = `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/articles-images/${fileName}`;

  return (
    <div
      key={article.id}
      className="relative flex flex-col items-center border mb-4 shadow-main"
    >
      <div className="w-full relative aspect-[calc(16/9)]">
        <Link href={`articles/${article.id}`}>
          <Image
            src={imageLink}
            alt="article image"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <div className=" p-4 w-full">
        <h4 className="gray-subheader text-left">{article.header}</h4>
      </div>

      <div className="mb-4">
        <DarkRedButton href={`articles/${article.id}`}>Читать</DarkRedButton>
      </div>
    </div>
  );
}
