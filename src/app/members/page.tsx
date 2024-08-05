import React from "react";
import { getMembers } from "../actions/membersActions";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const MembersPage = async () => {
  const members = await getMembers();

  if (!members) return notFound();

  return (
    <section>
      {members && members.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {members.map((member) => (
            <Card
              isHoverable
              isPressable
              className="col-span-2 row-span-2 h-[300px] w-full"
              key={member?.userId}
            >
              <CardHeader className="text-shadow absolute top-0 z-10 flex-col items-start bg-blue-950/80 text-white">
                <p className="text-tiny font-bold uppercase">
                  Your day your way
                </p>
                <h4 className="text-xl font-medium">{member?.username}</h4>
              </CardHeader>
              <Link
                href={`/members/${member.userId}`}
                className="h-full w-full"
              >
                <Image
                  alt="Relaxing app background"
                  className="object-fit z-0 h-full w-full"
                  src="/images/himmel-lila.jpg"
                  width={180}
                  height={120}
                />
              </Link>
              <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-blue-950/80">
                <div className="relative flex flex-grow items-center justify-around gap-5">
                  <Image
                    alt="Breathing app icon"
                    className="h-11 w-10 rounded-full bg-red-500/50 object-contain p-1"
                    src={member?.image || "/images/user.png"}
                    width={90}
                    height={90}
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Breathing App</p>
                    <p className="text-tiny text-white/60">
                      Get a good night's sleep.
                    </p>
                  </div>
                  <div className="text-tiny text-white/60">More....</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default MembersPage;
