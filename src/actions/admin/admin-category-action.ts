"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { AdminCategorySchema } from "@/schema/admin/admin-schema";
import * as z from "zod";

export const AdminCategoryAction = async (
  values: z.infer<typeof AdminCategorySchema>
) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.category.create({
      data: values,
    });
    return { success: "Category Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateCategoryAction = async (
  values: z.infer<typeof AdminCategorySchema>,
  id: string
) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.category.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    return { success: "Category Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteCategoryAction = async (id: string) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize user" };
    }
    await db.category.delete({
      where: {
        id,
      },
    });
    return { success: "Category Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
