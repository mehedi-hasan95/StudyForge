"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "./uploadthing";
import { toast } from "sonner";

interface Props {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
  values?: any;
}
export const FileUpload = ({ endPoint, onChange, values }: Props) => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
