"use server";

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMassageDto } from "@/lib/mappings";

export async function createMessage(
  recipientId: string,
  data: MessageSchema,
): Promise<ActionResult<Message>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientId,
        senderId: userId,
      },
    });

    return { status: "success", data: message };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Something went wrong on createMessage() function",
    };
  }
}

export async function getMassageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "desc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            username: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      });
    }

    return messages.map((message) => mapMessageToMassageDto(message));
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            username: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return messages.map((message) => mapMessageToMassageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
  const selector = isOutBox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((message) => ({ id: message.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
