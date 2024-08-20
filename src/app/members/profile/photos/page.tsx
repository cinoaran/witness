import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React from "react";
import { Image } from "@nextui-org/react";
import StarButton from "@/components/Buttons/StarButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import MemberPhotoUpload from "./MemberPhotoUpload";

const MembersPhotosPage = async () => {
  const userId = await getAuthUserId();

  const photos = await getMemberPhotosByUserId(userId);

  if (!photos) return notFound;

  return (
    <>
      <MemberPhotoUpload />
      <div className="grid-col-5 grid gap-3 p-5">
        {photos &&
          photos.map((photo) => (
            <div key={photo.id} className="relative w-[max-content]">
              <div className="absolute left-3 top-3 z-50">
                <StarButton loading={false} selected={true} />
              </div>

              <div className="absolute right-3 top-3 z-50">
                <DeleteButton loading={false} />
              </div>
              <Image
                width={220}
                height={220}
                src={photo.url}
                alt="Image of user"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default MembersPhotosPage;
