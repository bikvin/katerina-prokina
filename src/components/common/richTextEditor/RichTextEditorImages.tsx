import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import classes from "./rtEditor.module.css";
import { loadToS3 } from "@/lib/awsS3/loadToS3";

export const RichTextEditorImages = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [error, setError] = useState<string | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["clean"],
          ["link", "image"],
        ],
        handlers: {
          image: function (this: any) {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              const maxSize = 1024 * 1024; // 1 MB
              if (file.size > maxSize) {
                setError("Максимальный размер файла – 1 MB.");
                return;
              }

              try {
                const data = await loadToS3(file, "article-images");
                const range = this.quill.getSelection();
                const pos = range ? range.index : this.quill.getLength();
                this.quill.insertEmbed(pos, "image", data.url);
                setError(null);
              } catch (err) {
                console.error("Image upload failed", err);
                setError("Ошибка загрузки файла.");
              }
            };
          },
        },
      },
    }),
    []
  ); // 👈 stable reference across renders

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        className={classes.RTEditor}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};
