import type { RequestContext } from '@vercel/edge';
import webPush from 'web-push';

export const config = {
  runtime: 'edge',
};

// that key has been add to vercel like environment variable
const vapidKeys = {
  publicKey: `${process.env.VITE_PUBLIC_KEY}`,
  privateKey: `${process.env.VITE_PRIVATE_KEY}`,
};

webPush.setVapidDetails(
  'mailto:hung0895@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
 
export default function handler(request: Request, context: RequestContext) {
  if(request.method.toLocaleLowerCase() !== 'post') {
    return Response.json({
      error: "Not support this method"
    }, 
    {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  // const data = await request.json();
 
  return Response.json(
    {
      // dataSent: data,
      vapidKeys
    },
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
}