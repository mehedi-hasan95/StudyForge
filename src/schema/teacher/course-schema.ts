import * as z from "zod";

export const CourseTitleSchema = z.object({
  title: z.string({
    message: "Course name is required",
  }),
});
export const CourseSchema = z.object({
  title: z
    .string({
      message: "Course name is required",
    })
    .optional(),
  description: z
    .string({
      message: "Description is required",
    })
    .optional(),
  imageUrl: z
    .string({
      message: "Image is required",
    })
    .optional(),
  price: z.coerce
    .number({
      message: "Price is required",
    })
    .optional(),
  categoryId: z
    .string({
      message: "Please select a category",
    })
    .optional(),
});

export const CourseAttachmentSchema = z.object({
  url: z.string({
    message: "Course Attachemt is required",
  }),
});

// Chapter
export const CourseChapterSchema = z.object({
  title: z.string({
    message: "Course Chapter required",
  }),
});

export const ChapterSchema = z.object({
  title: z
    .string({
      message: "Chapter title required",
    })
    .optional(),
  description: z
    .string({
      message: "Chapter description required",
    })
    .optional(),
  videoUrl: z
    .string({
      message: "Chapter video required",
    })
    .optional(),
  isFree: z
    .boolean({
      message: "Make it free or paid",
    })
    .optional(),
});
