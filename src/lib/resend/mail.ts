import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import { db } from "@/db";
import DOMPurify from "isomorphic-dompurify";

export const sendContactRequestEmail = async (
  name: string,
  contacts: string,
  message: string
) => {
  try {
    const emails = await db.settings.findUnique({
      where: { field: "notificationEmails" },
    });

    if (!emails) {
      throw new Error("Notifications Email not found");
    }

    const emailsArr = emails.value
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    // console.log("emailsArr", emailsArr);

    const html = `<p>Имя клиента: ${name}</p>
    <p>Контакты: ${contacts}</p>
    <p>Сообщение: ${message}</p>`;

    const cleanHtml = DOMPurify.sanitize(html);

    // emailsArr.forEach(async (email) => {
    //   await resend.emails.send({
    //     from: "onboarding@resend.dev",
    //     to: email,
    //     subject: "Пришел новый запрос",
    //     html: cleanHtml,
    //   });
    // });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: emailsArr,
      subject: "Пришел новый запрос",
      html: cleanHtml,
    });
  } catch (err) {
    console.log(err);
  }
};
