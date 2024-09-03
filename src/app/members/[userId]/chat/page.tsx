import React from "react";
import ChatForm from "./ChatForm";
import { getMassageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/types";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const messages = await getMassageThread(params.userId);

  return (
    <div className="relative max-h-[40vh] w-full">
      <div className="min-h-[40vh] px-5">
        {messages.length === 0
          ? "No Messages now!"
          : messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message as MessageDto}
                currentUserId={params.userId}
              />
            ))}
      </div>
      <div className="sticky bottom-0 left-3 right-3 w-full rounded-lg bg-blue-950/60 p-2">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatPage;
