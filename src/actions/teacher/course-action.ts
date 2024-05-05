"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { CourseTitleSchema } from "@/schema/teacher/course";
import * as z from "zod";

export const CreateCourseTitleAction = async (
  values: z.infer<typeof CourseTitleSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const validateFields = CourseTitleSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalid email" };
    }
    const { title } = validateFields.data;
    const createdCourse = db.course.create({
      data: {
        title,
        userId: currentUser?.id as string,
      },
    });
    return {
      success: "Course Created Successfully",
      id: (await createdCourse).id,
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
