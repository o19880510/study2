const Koa = require('koa');
const controller = require('./config/controller');
const bodyParser = require('koa-bodyparser');
const publicFile = require('./config/public_file');

const nunjucks = require('./config/nunjucks');
const session = require("koa-session2");


const app = new Koa();

app.use(publicFile('/public/', __dirname + '/public'));

const isProduction = process.env.NODE_ENV === 'production';
app.use(nunjucks("view", {
    noCache: !isProduction,
    watch: !isProduction
}));


app.use(async function(ctx, next){
    try {
        await next()

        var status = ctx.response.status;
        if (status >= 400 ){
            handleError(ctx, status, "")
        }
    }catch (e){
        let status = e.status || 500;
        let message = e.message || 'server error.';

        handleError(ctx, status, e)
    }
    function handleError(ctx, status, e) {
        switch (status){
            case 403:{
                ctx.render('error/403.html', {'err': e})
            }
                break;

            case 404:{
                ctx.render('error/404.html', {'err': e})
            }
                break;

            case 500:
            default: {
                ctx.render('error/500.html', {'err': e})
            }
        }
    }
});
app.use(session({
    "key": "jsessionId",
    "maxAge":  30 * 60 * 1000,
}));

app.use(bodyParser());

app.use(async(ctx, next) => {
    // ctx.cookies.get

    try {
        console.log("session=" + ctx.session.user.id)
    }catch (e){
    }
    await next();
});

app.use(async(ctx, next) => {
    console.log("request in" + ctx.request.path)
    await next();
});


app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');