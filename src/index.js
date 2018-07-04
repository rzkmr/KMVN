/*!
 * KMVN - index.js
 * Copyright(c) 2018 rzkmr
 * MIT Licensed
 */

'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import render from 'koa-ejs';
import Router from 'koa-router';
import path from 'path';

const app = new Koa();

const PORT = process.env.PORT || 3000;
const wlecomeMsg = `
== Welcome to KMVN ==
   ***************
`;

app.use(logger());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,
});

// create routes
const router = new Router();

router.get('/', async (ctx, next) =>
  // ctx.body = body.replace('{csrfToken}', ctx.csrf)

  ctx.render('index', {
    title: 'KMVN page',
    csrfToken: ctx.csrf,
  })
);

// Load routes
app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}`);
  console.log(wlecomeMsg);
});

app.on('error', function (err) {
  console.log(err.stack);
});

module.exports = server;
