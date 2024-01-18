import {Message} from "@/types";
import {format, subDays, formatDistance} from "date-fns";

type Props = {
  initialMessages: Message[];
  roomId: string;
};
function Messages({initialMessages, roomId}: Props) {
  return (
    <div className=" border h-[500px] w-[600px] overflow-y-auto">
      <div className="p-2">
        <h2 className="text-cyan-600 text-lg font-bold sticky p-5 bg-white  top-0 z-10">
          Messages
        </h2>

        <div className="">
          {!!initialMessages[0] ? (
            initialMessages?.map((message) => (
              <div
                key={message.messageId}
                className="p-2 bg-cyan-500/15 w-full flex items-center  "
              >
                <div className="flex flex-col space-y-4">
                  <h2 className="font-bold text-sm text-gray-700">
                    {message.username}
                  </h2>
                  <h3 className="text-sm text-gray-600 font-medium p-5 bg-cyan-300/50 w-[95%] rounded-lg">
                    {message.message}
                  </h3>
                </div>

                <div className="ml-auto px-5">
                  <p className="text-xs text-gray-500">
                    {formatDistance(new Date(message.createdAt), new Date())}{" "}
                    ago
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center text-lg text-gray-600 ">
              No new Messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
