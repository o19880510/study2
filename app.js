const Koa = require('koa');
const controller = require('./config/controller');
const bodyParser = require('koa-bodyparser');
const publicFile = require('./config/public_file');

const nunjucks = require('./config/nunjucks');


const app = new Koa();

app.use(publicFile('/public/', __dirname + '/public'));

app.use(bodyParser());

app.use(async(ctx, next) => {
    await next();
});

app.use(async(ctx, next) => {
    console.log("request in" + ctx.request.path)
    await next();
});

const isProduction = process.env.NODE_ENV === 'production';

app.use(nunjucks("view", {
    noCache: !isProduction,
        watch: !isProduction
}));

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');