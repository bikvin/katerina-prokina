"use client";
import React from "react";
import parse from "html-react-parser";

import { motion } from "framer-motion";

// const options: HTMLReactParserOptions = {
//   replace: (domNode) => {
//     if (domNode.type === "tag" && domNode.name === "ul") {
//       const el = domNode as Element;
//       return (
//         <ul className="list-[square] pl-6">
//           {domToReact(
//             el.children as import("html-react-parser").DOMNode[],
//             options
//           )}
//         </ul>
//       );
//     }
//   },
// };

export default function WhenNeededClient({
  itemsData,
}: {
  itemsData: { id: string; header: string; text: string }[];
}) {
  return (
    <div className="">
      <section
        id="when-needed"
        className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
      >
        <h2 className="font-bold text-slate-800 text-4xl mb-8">
          Когда необходима помощь?
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 "
        >
          {itemsData.length > 0 &&
            itemsData.map((item) => (
              <div className="mb-8" key={item.id}>
                <h4 className="text-2xl text-darkRed2 mb-4">{item.header}</h4>
                <div className="font-light text-lg when-list pl-4">
                  {parse(item.text)}
                </div>
              </div>
            ))}
        </motion.div>
      </section>
    </div>
  );
}
