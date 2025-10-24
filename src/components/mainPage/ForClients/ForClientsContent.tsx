"use client";

import React from "react";
import DOMPurify from "isomorphic-dompurify";

import { motion } from "framer-motion";

export function ForCLientsContent({
  header,
  htmlText,
}: {
  header: string;
  htmlText: string;
}) {
  const textObj = {
    __html: DOMPurify.sanitize(htmlText),
  };

  return (
    <div className="">
      <section
        id="forclients"
        className="for-clients py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col "
      >
        <h2 className="font-bold text-slate-800 text-4xl mb-8">{header}</h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          className=""
        >
          <div
            dangerouslySetInnerHTML={textObj}
            className="font-light text-xl mb-2"
          ></div>
        </motion.div>
      </section>
    </div>
  );
}
