"use client";

import { transformImageUrl } from "@/lib/util";
import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";

type Props = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Member Image"
          src={photo.publicId}
          width={200}
          height={200}
          crop="fill"
          gravity="faces"
          className="rounded-2xl"
        />
      ) : (
        <Image
          key={photo?.id}
          width={200}
          height={200}
          alt="Image of member"
          className="aspect-square rounded-lg object-cover"
          src={transformImageUrl(photo?.url) || "/images/user.png"}
        />
      )}
    </div>
  );
};

export default MemberImage;
