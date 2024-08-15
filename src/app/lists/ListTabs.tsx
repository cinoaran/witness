"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab, Card, Image, Avatar } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React, { useTransition } from "react";
import { Key } from "@react-types/shared";
import LikeButton from "@/components/actionButtons/LikeButton";
import Loading from "@/components/loading/loading";

type Props = {
  members: Member[];
  likedIds: string[];
};

const ListTabs = ({ members, likedIds }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "My likes" },
    { id: "target", label: "Me likes" },
    { id: "mutual", label: "Both likes" },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="z-0 mx-auto min-h-[42vh] max-w-7xl">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        onSelectionChange={(key) => handleTabChange(key)}
        className="flex items-center justify-center gap-10"
        classNames={{
          tabList:
            "max-w-fit relative  rounded-b-lg rounded-t-none bg-[black] bg-opacity-35 px-3",
          cursor: "bg-[#ed3a4c]",
          tab: "max-w-fit h-12",
          tabContent:
            "group-data-[selected=true]:text-[#ffffff] text-[#ffffff]",
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <Loading />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 place-items-center gap-5 md:grid-cols-5 lg:grid-cols-8">
                    {members.map((member) => (
                      <div className="relative" key={member?.id}>
                        <span className="absolute right-2 top-2 flex items-center rounded-full">
                          <LikeButton
                            targetId={member.userId}
                            hasLiked={
                              likedIds.includes(member.userId) ? true : false
                            }
                          />
                        </span>
                        <Image
                          alt="Breathing app icon"
                          className="w-[auto] rounded-full bg-white object-contain p-1"
                          src={member?.image || "/images/user.png"}
                          width="160px"
                          height="160px"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mx-auto block text-white">
                    <h2 className="text-center text-2xl">No members found</h2>
                  </div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListTabs;