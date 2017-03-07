/**
 * Created by Administrator on 2017-03-07.
 */


var mongoose = require('mongoose');

var options = { promiseLibrary: require('bluebird') };

mongoose.connect('mongodb://localhost/test', options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

module.exports = mongoose