"use client";

import { useDropzone } from "react-dropzone";
import classes from "./dropzoneInput.module.css";
import { useCallback, useEffect, useState } from "react";

import SortableImages from "@/components/admin/parallax-images/dropzone/sortableImages/sortableImages";
import { v4 as uuidv4 } from "uuid";

function DropzoneInput({ dbSavedFileNames, updateArrString }) {
  const [isUploading, setIsUploading] = useState(false);

  const [photoNames, setPhotoNames] = useState(dbSavedFileNames);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // console.log("useEfferct");
    // console.log("photoNames", photoNames);
    updateArrString(photoNames);
  }, [photoNames]);

  const addNewFile = (fileName) => {
    setPhotoNames((prevPhotoNames) => [
      ...prevPhotoNames,
      {
        name: fileName,
        id: uuidv4(),
      },
    ]);
  };

  const changeOrder = (newArr) => {
    // console.log("newArr", newArr);
    setPhotoNames(newArr);
  };

  const deleteFile = (id) => {
    // console.log("DeleteFile with id: ", id);
    // console.log("isDeleting", isDeleting);
    setIsDeleting(true);

    setPhotoNames((prevPhotoNames) => {
      // console.log("prevPhotoNames", prevPhotoNames);
      const newPhotoNames = prevPhotoNames.filter(
        (photoName) => photoName.id !== id
      );
      // console.log("newPhotoNames", newPhotoNames);
      return newPhotoNames;
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length == 0) return;

    setIsUploading(true);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;

        const loadToS3 = async () => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("directory", "parallax-images");

          try {
            const response = await fetch("/api/s3-upload", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();

            addNewFile(data.fileName);

            setIsUploading(false);
          } catch (error) {
            console.log(error);
            setIsUploading(false);
          }
        };
        loadToS3();
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  acceptedFiles.map((file) => (
    <li key={file.path} className={classes.fileName}>
      {file.path} - {file.size} байт
    </li>
  ));

  let dropzoneStyle = `${classes.dropzone}`;

  if (isDragAccept) {
    dropzoneStyle += ` ${classes.accept}`;
  }

  if (isDragReject) {
    dropzoneStyle += ` ${classes.reject}`;
  }

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: dropzoneStyle,
        })}
      >
        <input {...getInputProps()} />
        <p>Выберите файл или перетащите сюда.</p>
      </div>

      <aside>
        <SortableImages
          isUploading={isUploading}
          photoNames={photoNames}
          changeOrder={changeOrder}
          deleteFile={deleteFile}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />

        <ul>
          {fileRejections.length > 0 && (
            <p className={classes.error}>Выберите не более 1 файла</p>
          )}
        </ul>
      </aside>
    </section>
  );
}

export default DropzoneInput;
