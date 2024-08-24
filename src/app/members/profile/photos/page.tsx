import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/memberImages/memberPhotos";

const MembersPhotosPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  if (!photos) return notFound;

  return (
    <>
      <MemberPhotoUpload />
      <div className="grid-col-5 grid gap-3 p-5">
        <MemberPhotos
          photos={photos}
          editting={true}
          mainImageUrl={member?.image}
        />
      </div>
    </>
  );
};

export default MembersPhotosPage;
