import { signOut } from "@/auth";
import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineNoPhotography } from "react-icons/md";

interface UserMenuProps {
  pathname: string;
  userProfile: {
    email: string;
    image?: string;
    name?: string;
    id: string;
  };
}

const UserMenu = ({
  userProfile: { email, image, name },
  pathname,
}: UserMenuProps) => {
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
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="ring-red-300 transition-transform"
            color="secondary"
            name={name || "Username"}
            size="lg"
            fallback={<MdOutlineNoPhotography size={24} />}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          aria-setsize={14}
        >
          <DropdownItem
            as={"div"}
            textValue="Profile infos"
            className="pointer-events-none"
          >
            <p className="font-semibold uppercase">Signed in as</p>
            <p className="font-normal">{email}</p>
          </DropdownItem>
          <DropdownItem as={"div"} textValue="Edit profile link">
            <Link
              href="/members/edit"
              className="flex items-center justify-center gap-4"
            >
              <FaUserEdit size={20} />
              <span>Edit my profile</span>
            </Link>
          </DropdownItem>
          <DropdownItem as={"div"} textValue="Logout button" className="mt-3">
            <Button
              color="danger"
              onClick={() => signOut()}
              size="sm"
              fullWidth={true}
            >
              Log Out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserMenu;
