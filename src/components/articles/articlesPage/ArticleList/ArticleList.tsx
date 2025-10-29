// import classes from "./accordionItemsEdit.module.css";
// import ArticlesItem from "./ArticlesItem";
"use client";
import { Article } from "@prisma/client";
import ArticleItem from "./ArticleItem";
import { motion } from "framer-motion";

export default function ArticleList({
  articleData,
  header,
}: {
  articleData: Article[];
  header: string;
}) {
  return (
    <section className="pb-16 md:pb-20 md:pt-10 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col">
      <h2 className="text-4xl font-bold mb-10">{header}</h2>
      {articleData.length === 0 && (
        <div className="text-center text-xl  font-light tracking-widest">
          Тут пока ничего нет
        </div>
      )}

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
        className={`grid grid-cols-1 md:grid-cols-2 gap-8`}
      >
        {articleData.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </motion.div>
    </section>
  );
}

{
  /* <motion.div
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
            <DarkRedButton href="#contacts">Напишите мне</DarkRedButton>
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
          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/avatar-images/${imageFilename}`}
          width="300"
          height="200"
          alt={header}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-main"
        />
      </motion.div> */
}
