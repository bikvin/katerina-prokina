"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

interface EditParallaxImagesFormState {
  errors: {
    imagesArr?: string[];
    id?: string[];
    _form?: string[];
  };
}

export async function editParallaxImages(
  formState: EditParallaxImagesFormState,
  formData: FormData
): Promise<EditParallaxImagesFormState> {
  const imagesArrString = formData.get("imagesArr");

  if (!imagesArrString || typeof imagesArrString !== "string") {
    return {
      errors: {
        _form: ["Error updating. String must not be null."],
      },
    };
  }

  try {
    await db.parallaxImage.upsert({
      where: {
        id: 1, // all is stored in an entry with id=1
      },
      update: {
        fileNamesArr: imagesArrString,
      },
      create: {
        fileNamesArr: imagesArrString,
        id: 1,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath("/");
  revalidatePath("/admin/parallax-images");
  redirect("/admin");
}
