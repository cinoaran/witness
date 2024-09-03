"use client";

import React, { useState } from "react";
import DeleteButton from "../actionButtons/DeleteButton";
import StarButton from "../actionButtons/StarButton";
import MemberImage from "./memberImage";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import { deleteImage, setMainImage } from "@/app/actions/userActions";

type Props = {
  photos: Photo[] | null;
  editting?: boolean;
  mainImageUrl?: string | null;
};

const MemberPhotos = ({ photos, editting, mainImageUrl }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ isLoading: true, type: "main", id: photo.id });
    await setMainImage(photo);
    router.refresh();
    setLoading({ isLoading: false, type: "", id: "" });
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ isLoading: true, type: "delete", id: photo.id });
    await deleteImage(photo);
    router.refresh();
    setLoading({ isLoading: false, type: "", id: "" });
  };
  return (
    <div className="z-10 grid grid-cols-1 place-items-center gap-5 px-5 py-10 text-white md:grid-cols-3 lg:grid-cols-4">
      {photos &&
        photos.map((photo) => (
          <div
            key={photo.id}
            className="relative w-[max-content] rounded-lg bg-gray-100/20 p-5"
          >
            {editting && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute left-1 top-1 z-50 rounded-full bg-white/50 p-1 hover:bg-white"
                >
                  <StarButton
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                    selected={photo.url === mainImageUrl}
                  />
                </div>

                <div
                  onClick={() => onDelete(photo)}
                  className="absolute right-1 top-1 z-50 rounded-full bg-white/50 p-1 hover:bg-white"
                >
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </>
            )}

            <MemberImage photo={photo} />
          </div>
        ))}
    </div>
  );
};

export default MemberPhotos;
