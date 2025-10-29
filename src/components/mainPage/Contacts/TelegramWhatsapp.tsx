import React from "react";
import Image from "next/image";

export default function TelegramWhatsapp({
  telegram,
  phone,
}: {
  telegram: string;
  phone: string;
}) {
  return (
    <>
      <div className="mt-20 mb-4">
        <a
          href={`https://t.me/${telegram.replace(/[^\w]/g, "")}`}
          className="flex text-lg items-center justify-start gap-2 hover:scale-110 origin-[0%_50%]"
          target="_blank"
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
          target="_blank"
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
        <p>Нажмите, чтобы перейти в приложение</p>
      </div>
    </>
  );
}
