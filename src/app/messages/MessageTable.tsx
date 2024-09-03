"use client";

import { transformImageUrl, truncateWords } from "@/lib/util";
import { MessageDto } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteMessage } from "../actions/messageActions";

type Props = {
  messages: MessageDto[];
  container: string;
};

const MessageTable = ({ messages, container }: Props) => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState({ id: "", loading: false });
  const columns = [
    {
      key: container === "inbox" ? "senderImage" : "recipientImage",
      label: container === "inbox" ? "Sender" : "Recipient",
    },
    { key: "text", label: "Message" },
    { key: "action", label: "Action" },
  ];

  const handleDeleteMessage = async (message: MessageDto) => {
    setDeleting({ id: message.id, loading: true });
    await deleteMessage(message.id, container === "outbox");
    router.refresh();
    setDeleting({ id: "", loading: false });
  };

  const handleRowSelect = (key: Key) => {
    const message = messages.find((message) => message.id === key);
    const url =
      container === "inbox"
        ? `/members/${message?.recipientId}`
        : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  return (
    <div className="mx-auto w-full md:w-[90%]">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key: string) => handleRowSelect(key)}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="No messages for this container">
          {messages.map((message) => (
            <TableRow key={message.id}>
              {(columnKey) => (
                <TableCell className="text-gray-950">
                  {columnKey === "recipientImage" ||
                  columnKey === "senderImage" ? (
                    <div className="flex items-start justify-start gap-3">
                      <Badge
                        as="div"
                        content=""
                        className={`z-100 absolute left-10 top-[8px] h-4 w-4 animate-pulse rounded-full ${message.dateRead && container !== "outbox" ? "bg-green-700" : "bg-transparent"}`}
                      >
                        <span className="sr-only h-4 w-4 rounded-full"></span>
                      </Badge>
                      <Avatar
                        as="div"
                        isBordered
                        name={columnKey}
                        className="aspect-square h-12 w-12 cursor-pointer self-end object-center ring-red-300 transition-transform"
                        src={
                          transformImageUrl(
                            message.senderImage || message.recipientImage,
                          ) || "/images/user.png"
                        }
                      />
                      <div className="hidden flex-col items-start justify-start md:inline-flex">
                        <span className="text-sm">
                          {message.senderName || message.recipientName}
                        </span>
                        <span className="text-xs">
                          {message.created || message.dateRead}
                        </span>
                      </div>
                    </div>
                  ) : (
                    columnKey === "text" &&
                    getKeyValue(truncateWords(message.text, 90), columnKey)
                  )}
                  {columnKey === "action" && (
                    <Button
                      isIconOnly
                      variant="light"
                      isLoading={
                        isDeleting.id === message.id && isDeleting.loading
                      }
                      onClick={() => handleDeleteMessage(message)}
                    >
                      <MdDelete size={24} />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MessageTable;
