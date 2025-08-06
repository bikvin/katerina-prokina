"use client";
import React from "react";

import { motion } from "framer-motion";

export default function About({
  aboutData,
}: {
  aboutData: {
    square1text: string;
    square2text: string;
    square3text: string;
    square4text: string;
  };
}) {
  return (
    <div className="">
      <section
        id="about"
        className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
      >
        <h2 className="font-bitter font-bold text-slate-800 text-4xl mb-8">
          Обо мне:
        </h2>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="green-square bg-green4 font-bitter font-normal  text-lg  tracking-wide px-16 py-10 w-[90%] md:w-[60%] flex flex-col  shadow-main -mb-4 z-[10]"
          dangerouslySetInnerHTML={{ __html: aboutData.square1text }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="green-square bg-green6 font-bitter font-normal  text-lg  tracking-wide px-16 py-10 w-[90%] md:w-2/3 flex flex-col  shadow-main self-end  -mb-2 z-[8]"
          dangerouslySetInnerHTML={{ __html: aboutData.square2text }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className=" green-square bg-green2 font-bitter font-normal  text-lg  tracking-wide px-16 py-10 w-[90%] md:w-[80%] flex flex-col  shadow-main self-center -mb-6 z-[8]"
          dangerouslySetInnerHTML={{ __html: aboutData.square3text }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="green-square bg-green6 font-bitter font-normal  text-lg  tracking-wide px-16 py-10 w-[90%] md:w-[55%] flex flex-col  shadow-main self-end mb-8 mr-10"
          dangerouslySetInnerHTML={{ __html: aboutData.square4text }}
        ></motion.div>
      </section>
    </div>
  );
}
