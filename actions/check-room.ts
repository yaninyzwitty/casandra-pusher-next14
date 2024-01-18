"use server";
import cassandraDb from '@/cassandra';
import { formSchema } from '@/lib/schema';
import * as z from 'zod'

export const checkRoom = async (values: z.infer<typeof formSchema>) => {
try {
    const validatedFields = formSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error:"Invalid fields"
        }
    };


    const { roomId  } = validatedFields.data;

    const query = `SELECT * FROM room WHERE room_id = ?`;
    const params = [roomId];

    const results = await cassandraDb.execute(query, params, { prepare: true });

    const data = results.rows.map(row => ({
        roomId: row.room_id?.toString(),
        username: row.username,
        userId: row.user_id,

    }));

    
    if(!data || data.length === 0 ) {
        return {
            error: "Data not found!",
        }
    };


    const room = data[0];

    return { success: !!room }





    
} catch (error) {
    console.log(error);
    return {
        error: "Something went wrong!"
    }
    
}



    

}