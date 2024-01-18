"use client";
import {pusherClient} from "@/lib/pusher";
import {Message} from "@/types";
import {FC, useEffect, useState} from "react";

type PusherProps = {
  message: string;
  roomId: string;
  messageId: string;
};

interface MessagesProps {
  initialMessages: Message[];
  roomId: string;
}

const Messages: FC<MessagesProps> = ({initialMessages, roomId}) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind(
      "incoming-message",
      ({message, roomId, messageId}: PusherProps) => {
        if (initialMessages.find((message) => message.messageId === messageId))
          return;

        setIncomingMessages((prev) => [...prev, message]);
      }
    );

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div>
      {initialMessages.map((message) => (
        <p key={message.messageId}>{message.message}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default Messages;
