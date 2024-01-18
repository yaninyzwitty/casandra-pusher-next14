"use server";
import cassandraDb from '@/cassandra';
import { messageSchema } from '@/lib/schema';
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import * as z from 'zod'

export const message = async (values: z.infer<typeof messageSchema>) => {
try {
    const { userId } = auth();
    const user = await currentUser();
    const username = `${user?.firstName + " " + user?.lastName} `;

    const messageId = crypto.randomUUID();


    const validatedFields = messageSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!"};
    };

    const { message, roomId } = validatedFields.data;
    if(!roomId) {
        return { error: "Room id required!"};
    };



    const insertQuery = `INSERT INTO message (message_id, room_id, user_id, username, message, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [messageId, roomId, userId, username, message, Date.now()];
    await cassandraDb.execute(insertQuery, params, { prepare: true });


    revalidatePath(`/room/${roomId}`);
    return {
        success: message 
    };

    
} catch (error) {
    console.log(error);
    return { error: "Something went wrong!"}

    
}

}