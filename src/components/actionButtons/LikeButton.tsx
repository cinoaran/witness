"use client";
import React from "react";
import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  targetId: string;
  hasLiked: boolean;
};

const LikeButton = ({ targetId, hasLiked }: Props) => {
  const router = useRouter();

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  };

  return (
    <div
      className="relative z-50 flex cursor-pointer items-center justify-center transition hover:opacity-30"
      onClick={toggleLike}
    >
      <AiOutlineHeart
        size={40}
        className="absolute rounded-full bg-slate-950/20 fill-white p-1"
      />

      <AiFillHeart
        size={26}
        className={hasLiked ? "animate-pulse fill-red-700" : "fill-white"}
      />
    </div>
  );
};

export default LikeButton;
