"use client";

import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  member: Member;
  navLinks: { name: string; href: string; icon: React.JSX.Element }[];
};
const MemberNavbar = ({ member, navLinks }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3">
      {navLinks.map((link) => (
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

export default MemberNavbar;
