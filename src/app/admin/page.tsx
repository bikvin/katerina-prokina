import ContactsList from "@/components/admin/contacts/ContactsList";
import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";
import type { Contact } from "@prisma/client";
export default async function AdminPage() {
  const contacts: Contact[] = [];

  try {
    const data = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    if (!data) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    data.forEach((item) => {
      contacts.push(item);
    });
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header page="main" />

      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] md:w-2/3 mx-auto">
          <h1 className="admin-form-header mt-10">Запросы от клиентов</h1>

          <ContactsList contacts={contacts} />
        </div>
      </div>
    </>
  );
}
