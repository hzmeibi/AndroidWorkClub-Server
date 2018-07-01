/**
 * Created by Steve on 14/8/6.
 */
var config = require('../config.js');
var mongoose = require('mongoose');
var connectString = "mongodb://localhost:27017/pictureAir";

mongoose.connect(connectString,function(err){
    if (err) {
        console.error('connect is refused to '+connectString);
    } else {
        console.log('connect is successed to '+connectString);
    }
});

module.exports = mongoose;  //暴露出去以便引用
