import CreateEditWhenNeededForm from "@/components/admin/when-needed/create-edit/Create-Edit";
import Header from "@/components/admin/topMenu/topMenu";

export default function CreateWhenNeededPage() {
  return (
    <>
      <Header page="whenNeeded" />
      <div className="max-w-screen-lg mt-10 mx-auto flex justify-center">
        <div className="w-[90%] md:w-1/2  mb-10">
          <h2 className="mt-10 admin-form-header">
            Создать новый пункт о помощи
          </h2>
          <CreateEditWhenNeededForm />
        </div>
      </div>
    </>
  );
}
