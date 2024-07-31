"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderLogo from "../logo/HeaderLogo";
import UserMenu from "../user/UserMenu";
import UserAuthLinks from "../user/UserAuthLinks";
import { Session } from "next-auth";

type Props = {
  user: Session["user"];
};

const TopNav = ({ user }: Props) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <header className="sticky top-0 z-50 mx-auto w-full bg-slate-100/70 md:w-[90%]">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        height={"8rem"}
        isBlurred={true}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="mr-16 sm:hidden"
          />

          <NavbarBrand>
            <Link href="/" aria-current="page">
              <div className="flex flex-col items-center justify-center gap-3">
                <HeaderLogo size="4em" textColor="text-red-400" />
                <h1 className="text-lg font-semibold uppercase text-inherit">
                  Witness Club
                </h1>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem
            isActive={pathname === "/"}
            as={Link}
            href="/"
            aria-current={pathname === "/" ? "page" : false}
            className="link-underline link-underline-black text-black"
          >
            Home
          </NavbarItem>
          <NavbarItem
            isActive={pathname === "/members"}
            as={Link}
            href="/members"
            aria-current={pathname === "/members" ? "page" : false}
            className="link-underline link-underline-black text-black"
          >
            Members
          </NavbarItem>
          <NavbarItem
            isActive={pathname === "/lists"}
            as={Link}
            href="/lists"
            aria-current={pathname === "/lists" ? "page" : false}
            className="link-underline link-underline-black text-black"
          >
            Lists
          </NavbarItem>
          <NavbarItem
            isActive={pathname === "/messages"}
            as={Link}
            href="/messages"
            aria-current={pathname === "/messages" ? "page" : false}
            className="link-underline link-underline-black text-black"
          >
            Messages
          </NavbarItem>
        </NavbarContent>
        {user ? (
          <UserMenu
            pathname={pathname}
            userProfile={{
              email: user.email || "",
              image: user.image || "",
              name: user.name || "",
              id: user.id || "",
            }}
          />
        ) : (
          <UserAuthLinks pathname={pathname} />
        )}

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default TopNav;
