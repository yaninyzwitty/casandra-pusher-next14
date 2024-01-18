"use client";
import * as z from "zod";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
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
import {messageSchema} from "@/lib/schema";
import {message} from "@/actions/message";
import {useTransition} from "react";
import {useParams} from "next/navigation";
import {toast} from "sonner";

function MessageForm() {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  console.log();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    const allValues = {...values, roomId: params?.roomId as string};
    startTransition(() => {
      message(allValues)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
          }

          if (data?.error) {
            toast.error(data?.error);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex items-center  space-x-4
        "
        >
          <FormField
            control={form.control}
            name="message"
            render={({field}) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input
                    placeholder="say something..."
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write a good message</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"lg"} className="" disabled={isPending}>
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
