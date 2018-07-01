/**
 * Created by vicky on 16/7/7.
 */
var mongoose = require('../database/mongodb');  //链接数据库
var leftBarSchema =  new mongoose.Schema({
    name: {type: String,required:true}, //类型名称
    age:{type:String},
    sax: {type: String,required:true}, //连接
    description:{type:String},
    createdOn: {type:String},//创建时间
    modifiedOn: {type:Date},//修改时间
    createdBy: {type:String},//创建者ID
    modifiedBy: {type:String} //创建者ID
});
module.exports = mongoose.model('user', leftBarSchema);