"use client";

import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

const ImageUploadButton = ({ onUploadImage }: Props) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="cloudinary-preset-name"
      className="flex items-center gap-2 rounded-lg bg-blue-950/60 px-4 py-2 text-white hover:bg-blue-950/80"
    >
      <HiPhoto size={28} /> Upload new image
    </CldUploadButton>
  );
};

export default ImageUploadButton;
