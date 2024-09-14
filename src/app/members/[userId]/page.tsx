import { getMemberByUserId } from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React from "react";

const MemberPage = async ({ params }: { params: { userId: string } }) => {
  const memberByUserId = await getMemberByUserId(params.userId);
  if (!memberByUserId) return notFound();

  const { description } = memberByUserId || {};

  return (
    <div className="text-md z-10 rounded-md bg-white/30 p-4">
      {description && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl">About Me</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default MemberPage;
