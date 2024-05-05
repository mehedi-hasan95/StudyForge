import * as z from "zod";

export const CourseTitleSchema = z.object({
  title: z.string({
    message: "Course name is required",
  }),
});
