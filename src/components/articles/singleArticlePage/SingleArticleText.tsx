import { Article } from "@prisma/client";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

export const SingleArticleText = ({ article }: { article: Article }) => {
  const textObj = {
    __html: DOMPurify.sanitize(article.htmlText),
  };

  return (
    <section className="pb-16 md:pb-20 mt-4 px-8 md:px-10 overflow-x-hidden max-w-screen-lg mx-auto">
      <h2 className="font-bold text-slate-800 text-4xl mb-8">
        {article.header}
      </h2>
      <div
        className="[&>p]:mb-4 font-light text-lg"
        dangerouslySetInnerHTML={textObj}
      ></div>
    </section>
  );
};
