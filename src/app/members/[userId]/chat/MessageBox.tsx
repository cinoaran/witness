"use client";

import { MessageDto } from "@/types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Avatar, divider, Divider } from "@nextui-org/react";
import { transformImageUrl } from "@/lib/util";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = message.senderId === currentUserId;

  const renderAvatar = () => (
    <Avatar
      name={message.senderName}
      className="h-14 w-14 self-end"
      src={transformImageUrl(message.senderImage) || "/images/user.png"}
    />
  );

  const messageContentClasses = clsx("flex flex-col px-2 py-1 w-[50%]", {
    "rounded-l-xl rounded-tr-xl border-gray-200 bg-blue-950/40 text-white":
      isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-600 bg-blue-950/70 text-white":
      !isCurrentUserSender,
  });

  const renderMessageHeader = () => (
    <>
      <div
        className={clsx("mb-1 flex w-full animate-drip-expand items-center", {
          "justify-between": isCurrentUserSender,
        })}
      >
        {message.dateRead && message.recipientId !== currentUserId ? (
          <span className="text-italic text-xs text-black">
            ( Read 4 min ago)
          </span>
        ) : (
          <div></div>
        )}
        <div className="my-1 flex gap-2">
          <span className="text-sm font-semibold uppercase text-white">
            {message.senderName}
          </span>
          <span className="text-sm text-white">{message.created}</span>
        </div>
      </div>
      <Divider className="bg-white/40" />
    </>
  );

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="py-3 text-sm">{message.text}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("mb-5 flex gap-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
    </div>
  );
};

export default MessageBox;
