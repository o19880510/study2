/**
 * Created by Administrator on 2017-03-07.
 */

var mongoose = require("./mongo_collection");
var Schema = mongoose.Schema;

var TestSchema = new Schema({
    name: String,
    modifyDate: { type: Date, default: Date.now },
    createDate: { type: Date, default: Date.now },
});

TestSchema.statics.find1 = function (query, fn) {
    this.find(query, fn)
}

TestSchema.methods.find2 = function (query, fn) {
    console.log(query)
    return this.model("test").find(query)
}

var TestModel = mongoose.model('test', TestSchema);


var test = new TestModel();
test.name = "tianjp";
test.save(function (err) {
    console.log(err)
});

results = test.find2({"_id": "58becc4d3f4b52221c6c259d"})
results.then(function (data) {
    console.log("111="+data)
})

async function find() {
    results2 = await test.find2({"_id": "58becc4d3f4b52221c6c259d"})
    console.log("await="+results2)
}
find()

TestModel.find1({}, function (err, results) {
    console.log(results)
})
