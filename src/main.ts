import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
  '/users/*': '/user?login=$1'
}));

server.get('/user', (req: any, res: any) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req: any, _res: any, next: any) => {
  if (req.method === 'POST') req.body.createdAt = Date.now();
  next();
});

server.use(router);
server.listen(80, () => {
  console.log('Lynx Client API  Copyright (c) 2021 Lynx Roleplay <lynxrp.team@gmail.com>');
});
