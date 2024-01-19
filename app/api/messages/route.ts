import cassandraDb from "@/cassandra";
import { messageSchema } from "@/lib/schema";
import { auth, currentUser  } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { serverPusher } from "@/lib/pusher";

export async function POST (req: Request) {
    try {
        const { userId } = auth();
        const user  = await currentUser();
        const username = `${user?.firstName + " " + user?.lastName}`;
        const messageId = crypto.randomUUID();

        const body = await req.json()
        const validatedFields = messageSchema.safeParse(body);
        if(!validatedFields.success) {
            return new NextResponse('Invalid fields', { status: 400 })
        };

        const { message, roomId } = validatedFields.data;

        if(!roomId) {
            return new NextResponse('Room id required!', { status: 400 })
        };

        serverPusher.trigger(roomId, 'incoming-message', {
            message,
            roomId,
            userId,
            username,
            createdAt: Date.now(),
            messageId
        });

        




        const insertQuery = `INSERT INTO message (message_id, room_id, user_id, username, message, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [messageId, roomId, userId, username, message, Date.now()];
        await cassandraDb.execute(insertQuery, params, { prepare: true });



        return NextResponse.json({ message  })
    



        
        
    } catch (error) {
        console.log(error);

        return new NextResponse('Internal Server Error', { status: 500 })
        
    }

}



