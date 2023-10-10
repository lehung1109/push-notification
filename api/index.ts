import express from "express";
import webPush from 'web-push';

const app = express();

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

app.get('/api', (req, res) => {
  res.end(`Hello! This is a control page`);
});

app.get('/api/trigger-push-message', async (req, res) => {
  return res.status(200).json(
    {
      dataSent: req.body,
      vapidKeys
    }
  );
});

export default app;