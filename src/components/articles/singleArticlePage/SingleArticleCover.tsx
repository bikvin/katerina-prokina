import React from "react";
import Image from "next/image";

export const SingleArticleCover = ({ imageName }: { imageName: string }) => {
  const imageLink = `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/articles-images/${imageName}`;

  return (
    <section className="pb-3 md:pb-6 pt-10 px-8 md:px-10 overflow-x-hidden max-w-screen-lg mx-auto">
      <div className="relative w-full aspect-[calc(16/9)]">
        <Image
          src={imageLink}
          alt="Моя статья"
          fill
          className="object-cover"
        ></Image>
      </div>
    </section>
  );
};
