"use server";

import cassandraDb from "@/cassandra";
import { auth, currentUser } from "@clerk/nextjs";

// import cassandraDb from "@/cassandra";

export const createRoomHandler =  async () => {
   try {
    const { userId  } =  auth();
    const user = await currentUser();
    const username = (user?.firstName + " " + user?.lastName);
    const roomId = crypto.randomUUID();

    const insertQuery = `INSERT INTO room (room_id, user_id, username) VALUES (?, ?, ?)`;
    const params = [roomId, userId, username]; 

    await cassandraDb.execute(insertQuery, params, { prepare: true });

    return { success: roomId }
    
   } catch (error) {

    console.log(error);

    return { error: "Something went wrong "}
    
   }



    




}