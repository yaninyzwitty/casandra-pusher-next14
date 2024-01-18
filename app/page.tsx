"use client";

import {createRoomHandler} from "@/actions/create-room";
import InputForm from "@/components/input-form";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {toast} from "sonner";

function Home() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createRoom = () => {
    startTransition(() => {
      createRoomHandler().then((data) => {
        if (data || !!data) {
          router.push(`/room/${data.success}`);
          toast.success(data.success);
        }

        if (!data.success || !data) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center pt-10 flex-col space-y-6">
      <h2 className="text-cyan-600 text-lg">SIMPLE REALTIME MESSAGING</h2>

      <Button onClick={createRoom} disabled={isPending}>
        Create Room
      </Button>

      <p className="text-gray-600 text-xs leading-6">
        If you already have a room, please enter the room id you want to join.
      </p>

      <InputForm />
    </div>
  );
}

export default Home;
