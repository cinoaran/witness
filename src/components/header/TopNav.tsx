"use client";
import React, { useState } from "react";
import { signOutUser } from "../../app/actions/authActions";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderLogo from "../logo/HeaderLogo";
import UserMenu from "../user/UserMenu";
import UserAuthLinks from "../user/UserAuthLinks";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { MdOutlineHome } from "react-icons/md";
import { FaList, FaUserAltSlash, FaUsers } from "react-icons/fa";
import { BsChatRightDots } from "react-icons/bs";

type Props = {
  user: Session["user"];
  userInfoName: string | null;
  userInfoImage?: string | null;
};

const TopNav = ({ user, userInfoName, userInfoImage }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      name: "Home",
      href: `/`,
      icon: <MdOutlineHome size={18} />,
    },
    {
      name: "Members",
      href: "/members",
      icon: <FaUsers size={18} />,
    },
    {
      name: "Lists",
      href: "/lists",
      icon: <FaList size={18} />,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <BsChatRightDots size={18} />,
    },
  ];

  const handleLogOut = async () => {
    const logOutUser = await signOutUser();
    setIsMenuOpen(false);
    return logOutUser;
  };

  return (
    <header className="sticky top-0 z-50 mx-auto w-full bg-white bg-opacity-40 md:w-[90%]">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}
        maxWidth="full"
        height={"8rem"}
        isBlurred={true}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />

          <NavbarBrand className="w-full">
            <Link
              href="/"
              aria-current="page"
              className="flex translate-x-[37%] flex-col items-center justify-center gap-2 md:translate-x-0"
            >
              <HeaderLogo size="4em" textColor="text-red-400" />

              <h1 className="text-center text-lg font-semibold uppercase text-inherit">
                Witness Club
              </h1>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden flex-1 gap-4 sm:flex" justify="center">
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
            setIsMenuOpen={setIsMenuOpen}
            userProfile={{
              email: user.email || "",
              image: userInfoImage || user.image || "",
              name: userInfoName || user.name || "",
              id: user.id || "",
            }}
          />
        ) : (
          <UserAuthLinks pathname={pathname} setIsMenuOpen={setIsMenuOpen} />
        )}

        <NavbarMenu>
          <NavbarMenuItem>
            {menuItems.map((item, index) => (
              <Link
                key={`${item}-${index}`}
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                className={`${item.href === pathname ? "text-gray-950/70" : "text-gray-800/30"} flex w-full items-center justify-start gap-2 py-2 text-sm hover:text-gray-950/80`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="rounded-full border-[0.3px] border-white bg-red-500 p-2 text-center text-white hover:border-red-700">
                  {item.icon}
                </span>
                <span className="link-underline link-underline-black text-center font-semibold uppercase">
                  {item.name}
                </span>
              </Link>
            ))}
            {user && (
              <div
                className="flex w-full cursor-pointer items-center justify-start gap-2 py-2 text-sm text-gray-800/30 hover:text-gray-950/80"
                onClick={() => handleLogOut()}
              >
                <span className="rounded-full border-[0.3px] border-white bg-red-500 p-2 text-center text-white hover:border-red-700">
                  <FaUserAltSlash size={18} />
                </span>
                <span className="link-underline link-underline-black text-center font-semibold uppercase">
                  Log out
                </span>
              </div>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default TopNav;
