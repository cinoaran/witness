"use client";

import React, { useState } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import StarButton from "../Buttons/StarButton";
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
    <div className="grid-col-5 grid gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative w-[max-content]">
            {editting && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute left-3 top-3 z-50"
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
                  className="absolute right-3 top-3 z-50"
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
