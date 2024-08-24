import React from "react";
import TopNav from "./TopNav";
import { auth } from "@/auth";
import { getUserInfoForNav } from "@/app/actions/userActions";

const Header = async () => {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  return (
    <TopNav
      user={session?.user}
      userInfoName={userInfo?.username as string}
      userInfoImage={userInfo?.image as string}
    />
  );
};

export default Header;
