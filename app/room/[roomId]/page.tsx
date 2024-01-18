import {messages} from "@/actions/messages";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import MessageForm from "./message-form";
import Messages from "./messages";

type Props = {
  params: {
    roomId: string;
  };
};

async function RoomIdPage({params: {roomId}}: Props) {
  const initialMessages = await messages(roomId);

  return (
    <div className="flex items-center justify-center p-5 space-y-8 flex-col">
      <div className="flex items-center ">
        <h1 className="text-cyan-600 text-lg uppercase">Your Messages</h1>
        <Button className="mx-16" asChild>
          <Link href={"/"}>Go back</Link>
        </Button>
      </div>

      <div className="flex items-center flex-col space-y-4">
        {/* go from here */}
        <MessageForm initialMessages={initialMessages} />
        <Messages initialMessages={initialMessages} roomId={roomId} />
      </div>
    </div>
  );
}

export default RoomIdPage;
