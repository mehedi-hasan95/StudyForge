"use server";

import Mux from "@mux/mux-node";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import {
  ChapterSchema,
  CourseChapterSchema,
} from "@/schema/teacher/course-schema";
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
  values: { id: string; position: number }[],
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
        data: { position: item.position },
      });
    }
    return { success: "Chapter reorder successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Update chapter
const { video } = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], // This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});
export const UpdateChapterUpdateAction = async (
  values: z.infer<typeof ChapterSchema>,
  id: string,
  courseId: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userRole = await CurrentUserRole();
    if (userRole !== "TEACHER") {
      return { error: "Unauthorize user" };
    }
    const ownerCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId: currentUser?.id,
      },
    });
    if (!ownerCourse) {
      return { error: "Unauthorize user 2" };
    }
    await db.chapter.update({
      where: {
        id,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: id,
        },
      });
      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      // Create Video for mux
      const asset = await video.assets.create({
        input: values.videoUrl as any,
        playback_policy: "public" as any,
        test: false,
      });
      // Create mux data to save db
      await db.muxData.create({
        data: {
          chapterId: id,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id as string,
        },
      });
    }

    return { success: "Chapter update successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
