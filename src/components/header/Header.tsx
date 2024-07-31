import React from "react";
import TopNav from "./TopNav";
import { auth } from "@/auth";
import { chownSync } from "fs";

const Header = async () => {
  const session = await auth();

  return <TopNav user={session?.user} />;
};

export default Header;
