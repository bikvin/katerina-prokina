"use server";

import { db } from "@/db";

import { revalidatePath } from "next/cache";
import { editImagesSchema } from "@/zod/images/imagesSchema";

interface EditImagesFormState {
  errors?: {
    imagesArrString?: string[];
    imageGroup?: string[];
    _form?: string[];
  };
  success?: {
    message: string;
  };
}

export async function EditImagesAction(
  formState: EditImagesFormState,
  formData: FormData
): Promise<EditImagesFormState> {
  // const imagesArrString = formData.get("imagesArr");

  // if (!imagesArrString || typeof imagesArrString !== "string") {
  //   return {
  //     errors: {
  //       _form: ["Error updating. String must not be null."],
  //     },
  //   };
  // }

  const result = editImagesSchema.safeParse({
    imageGroup: formData.get("imageGroup"),
    imagesArrString: formData.get("imagesArrString"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.imageGroupArray.upsert({
      where: {
        imageGroupName: result.data.imageGroup,
      },
      update: {
        fileNamesArr: result.data.imagesArrString,
      },
      create: {
        fileNamesArr: result.data.imagesArrString,
        imageGroupName: result.data.imageGroup,
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
  revalidatePath(`/admin/${result.data.imageGroup}-images`);
  return {
    success: { message: "Сохранено" },
  };
}
