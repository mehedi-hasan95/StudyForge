"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white customizeEditor">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
