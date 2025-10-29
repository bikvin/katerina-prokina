"use client";
import React from "react";
import { motion } from "framer-motion";
// import ContactForm from "../ContactForm/ContactForm";
import YandexMap from "./YandexMap";
import TelegramWhatsapp from "./TelegramWhatsapp";

export default function Contacts({
  header,
  telegram,
  phone,
  text,
}: {
  header: string;
  telegram: string;
  phone: string;
  text: string;
}) {
  return (
    <section
      id="contacts"
      className="py-16 md:py-20 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col"
    >
      <h2 className="font-bold text-slate-800 text-4xl mb-8">{header}</h2>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* <ContactForm /> */}

        <TelegramWhatsapp telegram={telegram} phone={phone} />
        <h2 className="font-bold text-slate-800 text-2xl mb-4">{text}</h2>
        <YandexMap />
      </motion.div>
    </section>
  );
}
