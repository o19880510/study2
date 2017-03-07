/**
 * Created by Administrator on 2017-03-05.
 */


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp');

var MyModel = mongoose.model('TestModel', new Schema({ name: String }));

MyModel.find(function (err, results) {

})
