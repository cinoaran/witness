import React from "react";
import ListTabs from "./ListTabs";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";
import { notFound } from "next/navigation";
import { Card, Divider, Image } from "@nextui-org/react";
import { auth } from "@/auth";

const ListsPage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const session = await auth();
  const members = await fetchLikedMembers(searchParams.type);

  if (!members) return notFound();
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-0 rounded-lg bg-[url('/images/himmel-lila.jpg')] bg-cover bg-no-repeat">
        <div className="flex w-full items-center justify-center rounded-lg bg-blue-950/50 py-5 text-white">
          <Image
            alt="Breathing app icon"
            className="rounded-full bg-white object-contain p-1"
            src={(session && session?.user?.image) || "/images/user.png"}
            width={190}
            height={190}
          />
        </div>
        <ListTabs members={members} likedIds={likeIds} />
      </div>
    </section>
  );
};

export default ListsPage;
