"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DarkRedButton from "@/components/common/darkRedButton";

export default function HeroSection({
  header,
  subHeader,
}: {
  header: string;
  subHeader: string;
}) {
  return (
    <section className="py-0 md:py-20 px-4 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex  md:flex-row flex-col-reverse mb-10 mt-10 md:mt-0">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        className="flex-1  flex items-center justify-center tracking-wide"
      >
        <div className="p-8">
          <h2 className="font-bold text-slate-800 text-2xl mb-4">{header}</h2>
          <p className="font-light text-lg">{subHeader}</p>
          <div className="mt-10">
            <DarkRedButton href="#">Напишите мне</DarkRedButton>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        className="flex-1 min-h-[450px] flex justify-center items-center relative"
      >
        <Image
          src="/img/photo2.jpeg"
          width="300"
          height="200"
          alt={header}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-main"
        />
      </motion.div>
    </section>
  );
}
