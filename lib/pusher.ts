import ClientPusher from 'pusher-js';
import PusherServer from 'pusher';

export const serverPusher = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_API_KEY!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
    secret: process.env.PUSHER_API_SECRET!,

});


export const clientPusher = new ClientPusher(process.env.PUSHER_APP_ID!, {
    cluster: process.env.PUSHER_CLUSTER! || 'mt1',
    authEndpoint: '/api/pusher-auth',
    authTransport: 'ajax',
    auth: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
})