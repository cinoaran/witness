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
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import HeaderLogo from "../Logo/HeaderLogo";

const Header = () => {
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
      {/* <nav className="mx-auto flex h-32 min-w-full items-center justify-between gap-10 bg-indigo-100 px-5">
        <div className="flex items-center gap-10">
          <div className="flex items-center justify-center md:flex-col">
            <HeaderLogo /> <h2>Witness Club</h2>
          </div>
        </div>
        <div className="hidden w-0 items-center justify-center gap-5 md:flex">
          <Link href="/members">Members</Link>
          <Link href="/lists">Lists</Link>
          <Link href="/massages">Massages</Link>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-950 p-3 text-white md:hidden">
            <GiHamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
          <Link className="hidden md:flex" href="/login">
            Login
          </Link>
          <Button href="/register" className="bg-gray-900 text-white">
            Sign Up
          </Button>
        </div>
      </nav> */}
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        height={"8rem"}
        isBlurred={true}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="mr-20 sm:hidden"
          />
          <NavbarBrand>
            <HeaderLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <Link href="/" aria-current="page">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/members">Members</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#">Customers</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="bg-gray-900 text-white"
              href="#"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
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

export default Header;
