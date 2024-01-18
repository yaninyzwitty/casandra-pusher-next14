"use server";

import cassandraDb from "@/cassandra";

export const messages = async ( roomId: string) => {
  try {
    const query = `SELECT * FROM message WHERE room_id = ?`;
    const params = [roomId];
    const results  = (await cassandraDb.execute(query, params, { prepare: true })).rows.map((row) => ({
        messageId: row.message_id?.toString(),
        roomId: row.room_id?.toString(),
        userId: row.user_id,
        username: row.username,
        message: row.message,
        createdAt: row.created_at,
    }));

    return results;


    
  } catch (error) {
    return []
    
  }


}