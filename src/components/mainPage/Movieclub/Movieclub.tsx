"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

export default function Movieclub({
  header,
  text,
  text2,
  subheader,
  imageFilename,
}: {
  header: string;
  text: string;
  text2: string;
  subheader: string;
  imageFilename: string;
}) {
  return (
    <div className="">
      <section
        id="movieclub"
        className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
      >
        <h2 className="font-bold text-slate-800 text-4xl mb-8">{header}</h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className=""
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/movieclub-images/${imageFilename}`}
            width="700"
            height="394"
            alt={"Киноклуб"}
            className=" shadow-main w-full mb-10"
          />

          <p className="font-light text-lg mb-2">{text}</p>
          <h4 className="font-bold text-slate-800 text-2xl mb-2">
            {subheader}
          </h4>
          <p className="font-light text-lg">{text2}</p>
        </motion.div>
      </section>
    </div>
  );
}
