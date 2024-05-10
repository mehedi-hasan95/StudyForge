"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import {
  CourseAttachmentSchema,
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
      return { error: "Something went wrong" };
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

export const CourseAttachmentAction = async (
  values: z.infer<typeof CourseAttachmentSchema>,
  courseId: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const validateFields = CourseAttachmentSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: "Something went wrong" };
    }
    const owner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: currentUser?.id,
      },
    });
    if (!owner) {
      return { error: "Unauthorize User" };
    }
    const { url } = validateFields.data;
    await db.attachment.create({
      data: {
        url,
        courseId,
        title: url.split("/").pop() as string,
      },
    });
    return { success: "Success" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const CourseAttachmentDeleteAction = async (
  courseId: string,
  attachmentId: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const owner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: currentUser?.id,
      },
    });
    if (!owner) {
      return { error: "Unauthorize User" };
    }
    await db.attachment.delete({
      where: {
        id: attachmentId,
      },
    });
    return { success: "Course Attachment Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
