"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Video({
  header,
  subHeader,
  rutubeLink = "#",
  youtubeLink = "#",
}: {
  header: string;
  subHeader: string;
  rutubeLink: string;
  youtubeLink: string;
}) {
  // console.log("rutubeLink", rutubeLink);

  return (
    <section
      id="about"
      className="py-20 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col items-center mb-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="w-full"
      >
        <h2 className="font-bold text-slate-800 text-4xl mb-4">{header}</h2>
        <p className="font-light text-lg mb-4">{subHeader}</p>
        <div className="relative pb-[56.25%]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full bg-blue-800">
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                src={rutubeLink}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <Link
          className="font-light text-lg text-blue-500 hover:underline"
          href={youtubeLink}
        >
          Смотреть на YouTube
        </Link>
      </motion.div>
    </section>
  );
}
