import { CurrentUser } from "@/lib/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) throw new Error("Unauthorize User");
  return { currentUser };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["audio", "video", "image", "pdf", "text"])
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  courseVideo: f({ video: { maxFileSize: "512GB", minFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
