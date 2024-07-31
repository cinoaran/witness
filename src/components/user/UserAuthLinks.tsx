import { NavbarItem, Button, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const UserAuthLinks = ({ pathname }: { pathname: string }) => {
  return (
    <NavbarContent justify="end">
      <NavbarItem
        isActive={pathname === "/login"}
        as={Link}
        href="/login"
        aria-current={pathname === "/login" ? "page" : false}
        className="link-underline link-underline-black text-black"
        key={"Login"}
      >
        Login
      </NavbarItem>
      <NavbarItem>
        <Button
          as={Link}
          className="bg-gray-900 text-white"
          href="/register"
          variant="flat"
          key={"Register"}
        >
          Register
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
export default UserAuthLinks;
