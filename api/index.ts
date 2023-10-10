import express from "express";
import webPush from 'web-push';
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

app.get('/api/get-vapid-keys', async (req, res) => {
  return res.status(200).json(
    {
      vapidKeys
    }
  );
});

app.get('/api/trigger-push-message', async (req, res) => {
  if(req.method.toLowerCase() !== 'post') {
    res.status(405).json({
      error: "Only support POST method"
    });

    return;
  }

  return res.status(200).json(
    {
      dataSent: req.body,
      vapidKeys
    }
  );
});

export default app;