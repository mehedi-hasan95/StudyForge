"use server";

import Mux from "@mux/mux-node";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import {
  CourseAttachmentSchema,
  CourseSchema,
  CourseTitleSchema,
} from "@/schema/teacher/course-schema";
import * as z from "zod";

const { video } = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], // This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});

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

// Full course delete
export const CourseDeleteAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const course = await db.course.findUnique({
      where: {
        id,
        userId: currentUser?.id,
      },
      include: {
        chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return { error: "Unauthorize User" };
    }
    for (const chapter of course.chapter) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }
    await db.course.delete({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    return { success: "Chapter Delete" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Course Publish action
export const CoursePublishAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const course = await db.course.findUnique({
      where: {
        id,
        userId: currentUser?.id,
      },
      include: {
        chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return { error: "Unauthorize User" };
    }
    const requiredCahpter = course.chapter.some(
      (chapter) => chapter.isPublished
    );
    if (
      !requiredCahpter ||
      !course.chapter ||
      !course.description ||
      !course.price ||
      !course.title ||
      !course.categoryId
    ) {
      return { error: "Required field missing" };
    }
    await db.course.update({
      where: {
        id,
        userId: currentUser?.id,
      },
      data: {
        isPublished: true,
      },
    });
    return { success: "Course Publish Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Course Unpublish action
export const CourseUnpublishAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const course = await db.course.findUnique({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    if (!course) {
      return { error: "Unauthorize User" };
    }

    await db.course.update({
      where: {
        id,
        userId: currentUser?.id,
      },
      data: {
        isPublished: false,
      },
    });
    return { success: "Course Unpublish Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
