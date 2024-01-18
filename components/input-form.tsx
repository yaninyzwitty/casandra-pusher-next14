"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {formSchema} from "@/lib/schema";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {checkRoom} from "@/actions/check-room";
import {useTransition} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function InputForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // check whether the room exists
    startTransition(() => {
      checkRoom(values)
        .then((data) => {
          if (data?.success) {
            router.push(`/room/${values.roomId}`);

            toast.success("Room exists! YAY😂");
          }

          if (data?.error) {
            toast.error("Room does not exist");
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="roomId"
            render={({field}) => (
              <FormItem>
                <FormLabel className="font-bold">Your room id</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder={`${crypto.randomUUID().slice(0, 6)}...`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your room id</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default InputForm;
