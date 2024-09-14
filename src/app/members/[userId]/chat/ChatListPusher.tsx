"use client";

import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { formatShortDateTime } from "@/lib/util";
import { Channel } from "pusher-js";
type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
};
const ChatListPusher = ({ initialMessages, currentUserId, chatId }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const channelRef = useRef<Channel | null>(null);

  const handleNewMessage = useCallback((message: MessageDto) => {
    const addNewMessage = setMessages((prevMessages) =>
      [...prevMessages, message].reverse(),
    );
    return addNewMessage;
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message,
      ),
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("message:read", handleReadMessages);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind("message:read", handleReadMessages);
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div className="flex-col-reverse px-5">
      {messages.length === 0
        ? "No Messages now!"
        : messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message as MessageDto}
              currentUserId={currentUserId}
              chatId={chatId}
            />
          ))}
    </div>
  );
};

export default ChatListPusher;
