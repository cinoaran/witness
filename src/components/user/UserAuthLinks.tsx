"use client";

import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { FaUserCheck, FaUserEdit, FaUserShield } from "react-icons/fa";

type Props = {
  pathname: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const UserAuthLinks = ({ pathname, setIsMenuOpen }: Props) => {
  return (
    <NavbarContent as="div" justify="end" className="relative">
      <Badge
        as="div"
        content=""
        className="z-100 absolute left-[45px] top-[-24px] h-5 w-5 animate-pulse rounded-full bg-red-500"
      >
        <span className="sr-only h-5 w-5 rounded-full bg-red-500"></span>
      </Badge>
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="rounded-full bg-red-500/60 p-2 text-sm text-white hover:bg-red-600">
          <Avatar
            isBordered
            as="button"
            className="cursor-pointer ring-red-300 transition-transform"
            color="secondary"
            name="Login or register"
            size="lg"
            fallback={<FaUserShield size={34} />}
            onClick={() => setIsMenuOpen(false)}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          aria-setsize={14}
        >
          <DropdownItem as={"div"} textValue="User registration">
            <Link
              href="/register"
              className={`${pathname === "/register" ? "text-gray-950/50" : "text-gray-600/30"} flex items-center justify-start gap-4`}
            >
              <span className="rounded-full border-[0.3px] border-white bg-red-500 p-2 text-center text-white hover:border-red-700">
                <FaUserEdit size={14} />
              </span>
              <span className="link-underline link-underline-black text-center font-semibold uppercase">
                Register
              </span>
            </Link>
          </DropdownItem>
          <DropdownItem as={"div"} textValue="User login">
            <Link
              href="/login"
              className={`${pathname === "/login" ? "text-gray-950/50" : "text-gray-600/30"} flex items-center justify-start gap-4`}
            >
              <span className="rounded-full border-[0.3px] border-white bg-red-500 p-2 text-center text-white hover:border-red-700">
                <FaUserCheck size={14} />
              </span>
              <span className="link-underline link-underline-black text-center font-semibold uppercase">
                Login
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserAuthLinks;
