const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router
  .post('/pages', (ctx, next) => {
    ctx.body = 'Pages';
  })
  .get('/pages/:id', (ctx, next) => {
    ctx.body = 'A page';
  })
  .put('pages-update', '/pages/:id', (ctx, next) => {
    ctx.body = 'Updated page';
  });

app
  .use(router.routes());
  //  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);

