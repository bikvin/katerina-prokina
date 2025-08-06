"use client";
import React from "react";
// import { MdNightsStay } from "react-icons/md";
// import { MdOutlineWarning } from "react-icons/md";
// import { FaRegSmile } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Prices() {
  return (
    <section
      id="articles"
      className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
    >
      <h2 className="font-bitter font-bold text-slate-800 text-4xl mb-8">
        Ссылки на мои статьи:
      </h2>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h4 className="font-bitter text-2xl hover:underline mb-4">
          <Link
            href="https://www.b17.ru/articles/tatiana_grishina/?tags=samootsenka"
            className="flex items-centers"
          >
            <MdOutlineCheck className="text-3xl mr-4" />
            <div className="flex items-center">Про самооценку</div>
          </Link>
        </h4>
        <h4 className="font-bitter text-2xl hover:underline  mb-4">
          <Link
            href="https://www.b17.ru/articles/tatiana_grishina/?tags=trevoga"
            className="flex items-centers"
          >
            <MdOutlineCheck className="text-3xl mr-4" />
            <div className="flex items-center">Про тревогу</div>
          </Link>
        </h4>
        <h4 className="font-bitter text-2xl hover:underline">
          <Link
            href="https://www.b17.ru/articles/tatiana_grishina/?tags=174130"
            className="flex items-centers"
          >
            <MdOutlineCheck className="text-3xl mr-4" />
            <div className="flex items-center">Про бессонницу</div>
          </Link>
        </h4>
      </motion.div>
    </section>
  );
}
