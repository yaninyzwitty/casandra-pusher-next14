import * as z from 'zod'
export const formSchema = z.object({
    roomId : z.string().min(2).max(50),
    // username : z.string(),
    // userId: z.string()
  });



  export const messageSchema = z.object({
    message: z.string().min(2),
    roomId: z.optional(z.string().min(5))
  });