"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import {
  CourseSchema,
  CourseTitleSchema,
} from "@/schema/teacher/course-schema";
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

export const CourseEditAction = async (
  values: z.infer<typeof CourseSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const validateFields = CourseSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Invalid email" };
    }
    await db.course.update({
      where: {
        id,
        userId: currentUser?.id,
      },
      data: {
        ...values,
      },
    });
    return { success: "Updated" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
