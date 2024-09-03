import React from "react";
import { getMessagesByContainer } from "../actions/messageActions";
import MessageTable from "./MessageTable";
import { MessageDto } from "@/types";

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const messages = await getMessagesByContainer(searchParams.container);

  return (
    <section>
      <MessageTable
        messages={messages as MessageDto[]}
        container={searchParams.container}
      />
    </section>
  );
};

export default MessagesPage;
