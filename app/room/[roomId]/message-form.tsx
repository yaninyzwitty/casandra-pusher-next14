"use client";

import useSWR from "swr";
import * as z from "zod";

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
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

import {Message} from "@/types";
import {useParams, useRouter} from "next/navigation";
import {fetcher} from "@/lib/fetchMessages";

type Props = {
  initialMessages: Message[];
};
function MessageForm({initialMessages}: Props) {
  const params = useParams();
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR<Message[]>("/api/messages", () =>
    fetcher(params.roomId as string)
  );

  const router = useRouter();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    try {
      const allValues = {...values, roomId: params.roomId};
      const uploadMessage = async () => {
        const {data} = await axios.post("/api/messages", allValues);

        return [data.message, ...messages!];
      };

      await mutate(uploadMessage(), {
        optimisticData: [values.message as any, ...(messages as Message[])],
        rollbackOnError: true,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const {isSubmitting, isValidating} = form.formState;
  const disabled = isSubmitting || isValidating;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-x-8 flex items-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({field}) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your message..."
                    type="text"
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
