const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log('Step 1');
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  console.log('Step 5');
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('Step 2');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('Step 4');
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
  console.log('Step 3');
});

app.listen(3000);

