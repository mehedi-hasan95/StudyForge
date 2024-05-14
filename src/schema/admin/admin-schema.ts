import { z } from "zod";

export const AdminCategorySchema = z.object({
  title: z.string({
    message: "Category name is required",
  }),
  catImage: z
    .string({
      message: "Image is optional",
    })
    .optional(),
});
