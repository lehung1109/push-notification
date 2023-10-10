import express from "express";
import webPush from 'web-push';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

app.get('/api/get-vapid-keys', (req, res) => {
  return res.status(200).json(
    {
      vapidKeys
    }
  );
});

app.post('/api/trigger-push-message', async (req, res) => {
  const { payload, pushSubscription } = req.body;

  await webPush.sendNotification(pushSubscription, payload);

  return res.status(200).json(
    {
      dataSent: req.body,
      test: 'test',
      vapidKeys
    }
  );
});

export default app;