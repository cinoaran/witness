import { getMemberPhotosByUserId } from "@/app/actions/membersActions";
import { transformImageUrl } from "@/lib/util";
import { Image } from "@nextui-org/react";
import React from "react";

const PhotosPage = async ({ params }: { params: { userId: string } }) => {
  const photos = await getMemberPhotosByUserId(params.userId);
  return (
    <div className="z-10 grid grid-cols-1 place-items-center gap-5 px-5 py-10 text-white md:grid-cols-3 lg:grid-cols-4">
      {photos &&
        photos.map((photo) => (
          <Image
            key={photo.id}
            alt="Image of member"
            className="aspect-square h-52 w-52 rounded-lg bg-gray-100/20 object-cover p-4"
            src={transformImageUrl(photo.url) || "/images/user.png"}
          />
        ))}
    </div>
  );
};

export default PhotosPage;
