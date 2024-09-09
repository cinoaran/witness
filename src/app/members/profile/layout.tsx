import { getMemberByUserId } from "@/app/actions/membersActions";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberNavbar";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  CardBody,
} from "@nextui-org/react";
import { getAuthUserId } from "@/app/actions/authActions";
import { MdOutlineArrowBack, MdOutlineNoPhotography } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { transformImageUrl } from "@/lib/util";

const Layout = async ({ children }: { children: ReactNode }) => {
  const userAuthId = await getAuthUserId();

  const member = await getMemberByUserId(userAuthId);

  if (!member) return notFound();

  const { username, image, userId, city, country } = member || {};

  const basePath = `/members/profile`;

  const navLinks = [
    {
      name: "Back",
      href: `/members`,
      icon: <MdOutlineArrowBack size={18} />,
    },
    {
      name: "Edit",
      href: `${basePath}/edit`,
      icon: <FaUserEdit size={18} />,
    },
    {
      name: "Photos",
      href: `${basePath}/photos`,
      icon: <MdOutlineNoPhotography size={18} />,
    },
  ];

  return (
    <section className="py-24">
      <Card
        key={userId}
        className="z-0 mx-auto min-h-[42vh] max-w-7xl bg-[url('/images/himmel-lila.jpg')] bg-cover bg-no-repeat"
      >
        <CardHeader className="flex items-center justify-between gap-5 bg-gray-950/70 text-white">
          <div className="ml-3 flex items-center gap-3 text-white">
            <Image
              alt="Breathing app icon"
              className="right-1 aspect-square rounded-full border-[0.3px] border-red-400 bg-black object-cover p-1"
              src={transformImageUrl(image) || "/images/user.png"}
              width={60}
              height={60}
            />
            <div className="hidden flex-col md:flex">
              <h4 className="text-md font-medium uppercase">{username}</h4>
              <h4 className="font-md text-sm">
                {city} {country}
              </h4>
            </div>
          </div>
          <div className="z-10 px-1">
            <MemberSidebar member={member} navLinks={navLinks} />
          </div>
        </CardHeader>
        <CardBody className="h-[auto]">{children}</CardBody>
        <CardFooter className="z-10 border-t-1 border-default-600 bg-blue-950/70">
          <div className="relative flex flex-grow items-center justify-around gap-5">
            <p className="text-medium text-white/60">Breathing App</p>
            <p className="text-medium text-white/60">
              Get a good night's sleep.
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Layout;
