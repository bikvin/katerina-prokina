"use client";

import classes from "./sortableImages.module.css";
import { BiLoaderAlt } from "react-icons/bi";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./sortableImagesItem";

export default function SortableImages({
  isUploading,
  photoNames,
  changeOrder,
  deleteFile,
  isDeleting,
  setIsDeleting,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photoNames} strategy={rectSortingStrategy}>
        <div className="mt-10  text-center">
          Перетащите картинки в нужном порядке. Потом не забудьте нажать
          Сохранить.
        </div>
        <div className={classes.sortableContainer}>
          {photoNames.map((photoName) => (
            <SortableItem
              key={photoName.id}
              id={photoName.id}
              name={photoName.name}
              deleteFile={deleteFile}
              disabled={false}
            />
          ))}
          {isUploading && (
            <div className={classes.sortableItem}>
              <BiLoaderAlt className={classes.loaderIcon} />
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    // console.log("Handle Drag End");
    const { active, over } = event;
    // console.log("active", active);
    // console.log("over", over);

    if (isDeleting) {
      // console.log("Deleting in progress. No cards shuffling");
      setIsDeleting(false);
      return;
    }

    if (active.id !== over.id) {
      // setItems((items) => {
      const oldIndex = photoNames
        .map((photoName) => photoName.id)
        .indexOf(active.id);
      const newIndex = photoNames
        .map((photoName) => photoName.id)
        .indexOf(over.id);

      const newArr = arrayMove(photoNames, oldIndex, newIndex);

      changeOrder(newArr);
    }
  }
}
