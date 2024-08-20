"use client";

import React from "react";
import ImageUploadButton from "@/components/Buttons/ImageUploadButton";
import { useRouter } from "next/navigation";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { addImage } from "@/app/actions/userActions";

const MemberPhotoUpload = () => {
  const router = useRouter();
  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      alert("Problem adding image");
    }
  };

  return (
    <div className="pl-5 pt-5">
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
};

export default MemberPhotoUpload;
