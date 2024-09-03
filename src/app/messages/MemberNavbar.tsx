"use client";

import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  member: Member;
  navLinks: {
    key: string;
    chip: boolean;
    name: string;
    href: string;
    icon: React.JSX.Element;
  }[];
};
const MemberNavbar = ({ navLinks }: Props) => {
  const searchParams = useSearchParams();
  const queryString = searchParams.get("container") || "inbox";

  return (
    <nav className="flex items-center gap-3">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${queryString === link.key ? "text-white" : "text-white/50"} flex w-full items-center justify-start gap-1 text-sm hover:text-white`}
        >
          <span className="relative rounded-full border-[0.3px] border-black bg-red-500 p-2 text-center hover:border-white">
            {link.icon}
            <small className="absolute -right-1 -top-1 flex h-4 w-4 items-center rounded-full bg-red-500 p-1 text-center text-xs text-white">
              4
            </small>
          </span>
          <span className="link-underline link-underline-white hidden text-center font-semibold uppercase md:inline-block">
            {link.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default MemberNavbar;
