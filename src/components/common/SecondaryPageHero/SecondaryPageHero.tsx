"use client";
import React from "react";
import Image from "next/image";

export function SecondaryPageHero({
  header,
  imageFilename,
  imageGroupName,
}: {
  header: string;
  imageFilename: string;
  imageGroupName: string;
}) {
  return (
    <>
      <div className="w-full relative aspect-[calc(3/2)] md:aspect-[calc(16/4)] mt-10 mb-10">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold text-4xl md:text-6xl">
          {header}
        </h1>
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${
            process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK
          }/${imageGroupName + "-images"}/${imageFilename}`}
          fill
          alt={header}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </>
  );
}
