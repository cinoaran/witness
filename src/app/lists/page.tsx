import React from "react";
import ListTabs from "./ListTabs";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";
import { notFound } from "next/navigation";
import { Image } from "@nextui-org/react";
import { getAuthUserId } from "../actions/authActions";
import { getMemberByUserId } from "../actions/membersActions";
import { transformImageUrl } from "@/lib/util";

const ListsPage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  const members = await fetchLikedMembers(searchParams.type);

  if (!members || !member) return notFound();
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <section className="py-12 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-0 rounded-lg bg-[url('/images/himmel-lila.jpg')] bg-cover bg-no-repeat">
        <div className="flex w-full items-center justify-center rounded-tl-md rounded-tr-md bg-blue-950/50 py-5 text-white">
          <Image
            alt="Breathing app icon"
            className="right-1 aspect-square rounded-full border-[0.3px] border-red-400 bg-black object-cover p-1"
            src={
              (transformImageUrl(member.image) as string) || "/images/user.png"
            }
            width={160}
            height={160}
          />
        </div>
        <ListTabs members={members} likedIds={likeIds} />
      </div>
    </section>
  );
};

export default ListsPage;
