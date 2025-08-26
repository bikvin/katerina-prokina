"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import YandexMap from "./YandexMap";

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
        <ContactForm />

        <div className="mt-20 mb-4">
          <a
            href={`https://t.me/${telegram.replace(/[^\w]/g, "")}`}
            className="flex text-lg items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
          >
            <Image
              src="/img/icons/social-media/telegram.svg"
              width={30}
              height={30}
              alt=""
            />
            Telegram : <b>{telegram}</b>
          </a>
        </div>
        <div className="mb-10">
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            className="flex  text-lg items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
          >
            <Image
              src="/img/icons/social-media/whatsapp.svg"
              width={30}
              height={30}
              alt=""
              className=""
            />
            WhatsApp : <b>{phone}</b>
          </a>
        </div>
        <h2 className="font-bold text-slate-800 text-2xl mb-4">{text}</h2>
        <YandexMap />
      </motion.div>
    </section>
  );
}
