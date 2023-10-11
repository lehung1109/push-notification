import express from "express";
import webPush, { WebPushError } from 'web-push';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return
  }

  next();
});

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

  try {
    if(pushSubscription && payload) {
      await webPush.sendNotification(pushSubscription, JSON.stringify(payload));
    }
  } catch (error) {
    if(error instanceof WebPushError) {
      return res.status(error.statusCode).json({
        error: error.body
      });
    }

    return res.json({
      error: JSON.stringify(error)
    });
  }

  return res.status(200).json(
    {
      dataSent: req.body,
      test: 'test',
      vapidKeys
    }
  );
});

export default app;