import GreenSquareEditorForm from "@/components/admin/about/greenSquareEditorForm";

import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";

export default async function AboutPage() {
  let helpData;

  try {
    const data = await db.about.findMany({
      where: {
        OR: [
          { squareNumber: 1 },
          { squareNumber: 2 },
          { squareNumber: 3 },
          { squareNumber: 4 },
        ],
      },
    });

    if (data) {
      helpData = {
        square1Text: data.find((el) => el.squareNumber === 1)?.text || "", // set either value from db or empty string
        square2Text: data.find((el) => el.squareNumber === 2)?.text || "",
        square3Text: data.find((el) => el.squareNumber === 3)?.text || "",
        square4Text: data.find((el) => el.squareNumber === 4)?.text || "",
      };
    } else {
      return <div className="text-red-800">Данные не найдены.</div>;
    }
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header page="about" />

      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] md:w-2/3 mx-auto">
          <h1 className="admin-form-header mt-10">Обо мне</h1>
          <GreenSquareEditorForm
            squareNumber={1}
            startingText={helpData.square1Text}
          />
          <GreenSquareEditorForm
            squareNumber={2}
            startingText={helpData.square2Text}
          />
          <GreenSquareEditorForm
            squareNumber={3}
            startingText={helpData.square3Text}
          />
          <GreenSquareEditorForm
            squareNumber={4}
            startingText={helpData.square4Text}
          />
        </div>
      </div>
    </>
  );
}
