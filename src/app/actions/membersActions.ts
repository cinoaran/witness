import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Photo } from "@prisma/client";

export const getMembers = async () => {
  const session = await auth();

  if (!session?.user) return null;

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    throw new Error("Testing stage gone wrong. Baddly");
    console.log(error);
  }
};

export const getMemberByUserId = async (userId: string) => {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
};

export const getMemberPhotosByUserId = async (userId: string) => {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });
    if (!member) return null;
    return member.photos.map((photo) => photo) as Photo[];
  } catch (error) {
    console.log(error);
  }
};
