import React from "react";
import ChatForm from "./ChatForm";
import { getMassageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import { createChatId } from "@/lib/util";
import ChatListPusher from "./ChatListPusher";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const userId = await getAuthUserId();
  const messages = await getMassageThread(params.userId);
  const chatId = createChatId(userId, params.userId);

  return (
    <div className="relative max-h-[40vh] w-full">
      <div className="min-h-[40vh] px-5">
        <ChatListPusher
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      </div>
      <div className="sticky bottom-0 left-0 right-0 w-full rounded-lg bg-blue-950/60 p-2">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatPage;
