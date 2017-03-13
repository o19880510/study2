/**
 * Created by Administrator on 2017-03-13.
 */


class ApiException extends Error {

    constructor(exceptionCode = null, code = null, msg = null) {

        super();
        if (code && msg) {
            this.code = code;
            this.msg = msg;
        } else if (exceptionCode) {
            this.code = exceptionCode.code;
            this.msg = exceptionCode.msg;
        } else {
            throw new Error("No error infomation.")
        }
    }
}

module.exports = ApiException

var error = new ApiException(exceptionCode = {
    "code": 1,
    "msg": "only test"
}, null, null)

var ExceptionCode = require("./exception_code")
var error = new ApiException(ExceptionCode.NAME_ERROR)

console.log(error.code)
console.log(error.msg)
