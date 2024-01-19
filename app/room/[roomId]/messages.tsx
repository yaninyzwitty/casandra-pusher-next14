"use client";
import {fetcher} from "@/lib/fetchMessages";
import {Message} from "@/types";
import {FC, useEffect, useState} from "react";
import useSWR from "swr";
import {pusherClient} from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  roomId: string;
}

const Messages: FC<MessagesProps> = ({initialMessages, roomId}) => {
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR<Message[]>("/api/messages", () => fetcher(roomId as string));

  useEffect(() => {
    const channel = pusherClient.subscribe(roomId);
    channel.bind("incoming-message", async (data: Message) => {
      if (messages?.find((message) => message.messageId === data.messageId))
        return;

      if (!messages) {
        await mutate(fetcher(roomId));
      } else {
        mutate(fetcher(roomId), {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, roomId]);

  return (
    <div>
      {(messages || initialMessages).map((message) => (
        <p key={message.messageId}>{message.message}</p>
      ))}
    </div>
  );
};

export default Messages;
