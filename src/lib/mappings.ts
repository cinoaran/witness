import { formatShortDateTime } from "./util";
import { MessageWithSenderRecipient } from "@/types";

export function mapMessageToMassageDto(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDateTime(message.created),
    dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.username  ?? undefined, // Add a null check here,
    senderImage: message.sender?.image  ?? undefined, // Add a null check here,
    recipientId: message.recipient?.userId,
    recipientImage: message.recipient?.image  ?? undefined, // Add a null check here,
    recipientName: message.recipient?.username  ?? undefined, // Add a null check here,
  };
}
