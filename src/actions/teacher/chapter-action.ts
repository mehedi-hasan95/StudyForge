"use server";

import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { CourseChapterSchema } from "@/schema/teacher/course-schema";
import * as z from "zod";

export const CreateChapterAction = async (
  values: z.infer<typeof CourseChapterSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const ownerCourse = await db.course.findUnique({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    if (!ownerCourse) {
      return { error: "Unauthorize user" };
    }
    const validateFields = CourseChapterSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Something went wrong" };
    }
    const { title } = validateFields.data;
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: id,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPostion = lastChapter ? lastChapter.position + 1 : 1;
    await db.chapter.create({
      data: {
        title,
        courseId: id,
        position: newPostion,
      },
    });
    return { success: "Chapter Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const CreateChapterUpdateAction = async (
  values: { id: string; position: string }[],
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const ownerCourse = await db.course.findUnique({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    if (!ownerCourse) {
      return { error: "Unauthorize user" };
    }
    for (let item of values) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position as any },
      });
    }
    return { success: "Chapter update successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
