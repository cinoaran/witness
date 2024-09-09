"use client";

import { transformImageUrl, truncateWords } from "@/lib/util";
import { MessageDto } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, useCallback, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteMessage } from "../actions/messageActions";

type Props = {
  messages: MessageDto[];
};

const MessageTable = ({ messages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutbox = searchParams.get("container") === "outbox";
  const [isDeleting, setDeleting] = useState({ id: "", loading: false });
  const columns = [
    {
      key: !isOutbox ? "senderName" : "recipientName",
      label: !isOutbox ? "Sender" : "Recipient",
    },
    { key: "text", label: "Message" },
    { key: "action", label: "Action" },
  ];

  const handleDeleteMessage = async (message: MessageDto) => {
    setDeleting({ id: message.id, loading: true });
    await deleteMessage(message.id, isOutbox);
    router.refresh();
    setDeleting({ id: "", loading: false });
  };

  const handleRowSelect = (key: Key) => {
    const message = messages.find((message) => message.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey];
      switch (columnKey) {
        case "recipientName":
        case "senderName":
          return (
            <div className="flex items-start justify-start gap-3">
              <Badge
                as="div"
                content=""
                className={`z-100 absolute left-10 top-[8px] h-4 w-4 animate-pulse rounded-full ${item.dateRead && !isOutbox ? "bg-green-700" : "bg-transparent"}`}
              >
                <span className="sr-only h-4 w-4 rounded-full"></span>
              </Badge>

              <Avatar
                as="div"
                isBordered
                name={columnKey}
                alt="Image of member"
                className="aspect-square h-12 w-12 cursor-pointer self-end object-center ring-red-300 transition-transform"
                src={
                  (isOutbox
                    ? transformImageUrl(item.recipientImage)
                    : transformImageUrl(item.senderImage)) || "/images/user.png"
                }
              />
              <div className="hidden flex-col items-start justify-start md:inline-flex">
                <span className="text-sm">
                  {isOutbox ? item.recipientName : item.senderName}
                </span>
                <span className="text-xs">
                  {!isOutbox ? item.created : item.dateRead}
                </span>
              </div>
            </div>
          );
        case "text":
          return <div>{cellValue && truncateWords(cellValue, 90)}</div>;

        default:
          return (
            <Button
              isIconOnly
              variant="light"
              isLoading={isDeleting.id === item.id && isDeleting.loading}
              onClick={() => handleDeleteMessage(item)}
            >
              <MdDelete size={24} className="text-red-500" />
            </Button>
          );
      }
    },
    [isOutbox],
  );

  return (
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
      <TableBody items={messages} emptyContent="No messages for this container">
        {(item) => (
          <TableRow key={item.id} className="cursor-pointer">
            {(columnKey) => (
              <TableCell className="text-gray-900">
                {renderCell(item, columnKey as keyof MessageDto)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MessageTable;
