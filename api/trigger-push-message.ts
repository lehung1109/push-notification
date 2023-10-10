import type { RequestContext } from '@vercel/edge';
import webPush from 'web-push';

export const config = {
  runtime: 'edge',
};
 
const vapidKeys = {
  publicKey: `${process.env.VITE_PUBLIC_KEY}`,
  privateKey: `${process.env.VITE_PRIVATE_KEY}`,
};

// webPush.setVapidDetails(
//   'mailto:hung0895@gmail.com',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey,
// );
 
export default function handler(request: Request, context: RequestContext) {
 
  return Response.json(
    vapidKeys,
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
}