"use client";

import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegImages } from "react-icons/fa";
import {
  MdOutlineArrowBack,
  MdOutlineChatBubbleOutline,
  MdOutlineNoPhotography,
} from "react-icons/md";

type Props = {
  member: Member;
};
const MemberSidebar = ({ member }: Props) => {
  const basePath = `/members/${member.userId}`;
  const pathname = usePathname();

  const navLink = [
    {
      name: "Back",
      href: `/members`,
      icon: <MdOutlineArrowBack size={18} />,
    },
    {
      name: "Profile",
      href: `${basePath}`,
      icon: <FaRegImages size={18} />,
    },
    {
      name: "Photos",
      href: `${basePath}/photos`,
      icon: <MdOutlineNoPhotography size={18} />,
    },
    {
      name: "Chats",
      href: `${basePath}/chats`,
      icon: <MdOutlineChatBubbleOutline size={18} />,
    },
  ];

  return (
    <nav className="flex items-center gap-3">
      {navLink.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${link.href === pathname ? "text-white" : "text-white/50"} flex w-full items-center justify-start gap-1 text-sm hover:text-white`}
        >
          <span className="rounded-full border-[0.3px] border-black bg-red-500 p-2 text-center hover:border-white">
            {link.icon}
          </span>
          <span className="link-underline link-underline-white hidden text-center font-semibold uppercase md:block">
            {link.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default MemberSidebar;
