/**
 * Created by tianjp on 2017-03-05.
 */
var fs = require('fs')

const RULE = {
    "GET ": (router, path, func) => {router.get(path, func);},
    "POST " : (router, path, func) =>{ router.post(path, func);}
}
function addControllers(router, controllersDir) {
    console.log(process.cwd() + '/' + controllersDir)
    var files = fs.readdirSync(process.cwd() + '/' + controllersDir);

    var controllerFiles = files.filter((f) => {
            return f.endsWith('.js');
    });

    mapping(router, controllerFiles);
}

function mapping(router, controllerFiles) {
    for (var f of controllerFiles) {
        console.log(`process controller: ${f}...`);
        // 导入js文件:
        let mapping = require(process.cwd() + '/controller/' + f);
        for (var url in mapping) {
            for (var method in RULE) {
                if (url.startsWith(method)) {
                    path = url.replace(method, "")
                    binding = RULE[method]
                    binding.apply(this, [router, path, mapping[url]])
                    break;
                }
            }
        }
    }
}

module.exports = function (dir) {
    let
        controllersDir = dir || 'controller',
        router = require('koa-router')();
    addControllers(router, controllersDir);
    return router.routes();
};
