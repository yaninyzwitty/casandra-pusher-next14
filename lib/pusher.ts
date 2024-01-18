import ClientPusher from 'pusher-js';
import PusherServer from 'pusher';

export const serverPusher = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: 'mt1',
  useTLS: true,

});

export const pusherClient = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'mt1',
    authEndpoint: '/api/pusher-auth',
    authTransport: 'ajax',
    auth: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  })
  