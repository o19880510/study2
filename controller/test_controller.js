/**
 * Created by Administrator on 2017-03-05.
 */

var fn_index = async(ctx, next) => {
    ctx.render("main.html", {});
};

var fn_signin = async(ctx, next) => {
        var
            name = ctx.request.body.name || '',
            password = ctx.request.body.password || '';
        console.log(`signin with name: ${name}, password: ${password}`);
        if (name === 'koa' && password === '12345') {
            ctx.render("login_result.html", {"result": 0, "name": name})
        } else {
            ctx.render("login_result.html", {"result": 255})
        }
    }
    ;

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};