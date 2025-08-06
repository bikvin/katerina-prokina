import React from "react";

export default function LongImageBar({ imageLink }: { imageLink: string }) {
  return (
    <div
      className={`bg-cover bg-center flex items-center justify-around md:justify-center px-4 md:px-0 gap-4 md:gap-16 min-h-[120px] overflow-x-scroll md:overflow-x-hidden scrollbar-h-2 scrollbar scrollbar-thumb-green4`}
      style={{
        backgroundImage: `url(${imageLink})`, // Direct URL
      }}
    ></div>
  );
}
