/**
 * Created by Administrator on 2017-03-05.
 */

var fn_index = async(ctx, next) => {
    ctx.render("index.html", {});
};

var fn_signin = async(ctx, next) => {
        var
            name = ctx.request.body.name || '',
            password = ctx.request.body.password || '';
        console.log(`signin with name: ${name}, password: ${password}`);
        if (name === 'koa' && password === '12345') {
            ctx.session.user = {
                "id": "tianjp",
            }
            ctx.render("login_result.html", {"result": 0, "name": name})
        } else {
            ctx.render("login_result.html", {"result": 255})
        }
    }
    ;

async function err(ctx, next){
    throw new Error("for test.")
}
module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'GET /error': err
};