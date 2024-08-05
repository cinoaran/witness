import { getMemberPhotosByUserId } from "@/app/actions/membersActions";
import { Image } from "@nextui-org/react";
import React from "react";

const PhotosPage = async ({ params }: { params: { userId: string } }) => {
  const photos = await getMemberPhotosByUserId(params.userId);
  console.log(photos);
  return (
    <div className="z-10 p-5 text-white">
      {photos &&
        photos.map((photo) => (
          <Image
            key={photo.id}
            alt="Image of member"
            className="aspect-square h-48 w-48 rounded-lg bg-white/70 object-cover p-4"
            src={photo.url || "/images/user.png"}
          />
        ))}
    </div>
  );
};

export default PhotosPage;
