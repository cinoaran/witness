import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "./EditForm";

const MembersEditPage = async () => {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return <EditForm member={member} />;
};

export default MembersEditPage;
