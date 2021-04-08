import express from 'express';
import ejwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';

const app = express();

interface AnyObject {
  [key: string]: any;
}

/// FIXME: Put downloads.json in the following path.
const downloads = require('../config/downloads.json');

let secret: string = sha256(Date.now().toString());
app.use(ejwt({ secret: secret, algorithms: ['HS256'], credentialsRequired: false }).unless({ path: ['/auth'] }));
app.use(express.json());

app.use((_err: any, req: any, _res: any, next: any) => {
  if (req.method === 'POST') req.body.createdAt = Date.now();
  next();
});

app.post('/auth', (req: any, res: any) => res.jsonp({ authentication_token: jwt.sign({
  created: Date.now(),
  secret: secret,
  type: 'client',
  id: req.body.id
}, secret, { expiresIn: '24h' }) }));

app.get('/client', (_req: any, res: any) => res.jsonp({
  version: 1
}));

app.get('/game', (_req: any, res: any) => res.jsonp({
  version: 1
}));

app.get('/download/:platform/:arch', (req: any, res: any) => {
  const platform = `${req.params.platform}_${req.params.arch}`;

  let result: AnyObject = {
    jre: downloads.jre[platform]
  };
  if (req.user && req.user.secret === secret) result.modpack = downloads.modpack;
  res.jsonp(result);
});

app.listen(80, () => {
  console.log('Lynx Client API  Copyright (c) 2021 Lynx Roleplay <lynxrp.team@gmail.com>');
});
