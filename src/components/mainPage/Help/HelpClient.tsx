"use client";
import React from "react";
// import { helpData } from "./HelpData";
// import AccordionItem from "./accordionItem";
import parse from "html-react-parser";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function HelpClient({
  itemsData,
}: {
  itemsData: { id: string; header: string; text: string }[];
}) {
  return (
    <div className="">
      <section
        id="help"
        className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
      >
        <h2 className="font-bitter font-bold text-slate-800 text-4xl mb-8">
          С чем помогаю:
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Accordion type="single" collapsible>
            {itemsData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.header}</AccordionTrigger>
                <AccordionContent>{parse(item.text)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}
