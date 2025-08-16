"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classes from "./sortableImages.module.css";
import Image from "next/image";

import { RiDeleteBin6Line } from "react-icons/ri";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, disabled: props.disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteClickHandler = (event) => {
    // console.log(
    //   "deleteClickHandler",
    //   event.currentTarget.id,
    //   event.currentTarget
    // );
    props.deleteFile(event.currentTarget.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes.sortableItem}
      {...attributes}
      {...listeners}
    >
      {
        <div key={props.id} className={classes.imagePreview}>
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_LINK}/parallax-images/${props.name}`}
            alt=""
            width={320}
            height={240}
          />
          <div
            className={classes.deleteIconBase}
            onMouseDown={deleteClickHandler}
            id={props.id}
          >
            <RiDeleteBin6Line className={classes.deleteIcon} />
          </div>
        </div>
      }
    </div>
  );
}
