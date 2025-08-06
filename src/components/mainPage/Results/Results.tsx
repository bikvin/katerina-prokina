"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

const data = [
  { imageLink: "/img/results/calmness_1.png", label: "Спокойствие" },
  {
    imageLink: "/img/results/relationships_1.png",
    label: "Гармония в отношениях",
  },
  { imageLink: "/img/results/confidence_1.png", label: "Вера в себя" },

  {
    imageLink: "/img/results/stressresistance_1.png",
    label: "Стрессоустойчивость",
  },
  {
    imageLink: "/img/results/knowyourself_1.png",
    label: "Лучшее понимание, что вы за человек",
  },
];

export default function Results() {
  return (
    <div className="">
      <section
        id="results"
        className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
      >
        <h2 className="font-bold text-slate-800 text-4xl mb-8">
          Каких результатов можно достичь в психотерапии?
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 "
        >
          {data.length > 0 &&
            data.map((item, index) => {
              const isLastOdd =
                data.length % 2 === 1 && index === data.length - 1;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    isLastOdd ? "md:col-span-2 md:justify-self-center" : ""
                  }`}
                >
                  <div className="relative min-h-[250px] min-w-[250px]">
                    <Image
                      src={item.imageLink}
                      width="250"
                      height="250"
                      alt=""
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                    />
                  </div>
                  <div className="text-2xl font-light max-w-[250px] text-center">
                    {item.label}
                  </div>
                </div>
              );
            })}
        </motion.div>
      </section>
    </div>
  );
}
