/**
 * Created by vicky on 18/3/19.
 */

var mongoose = require('../database/mongodb');  //链接数据库
var accountSchema =  new mongoose.Schema({
    userName: {type: String,required:true}, //用户名
    description:{type:String},//商品描述
    price: {type: Number},//价格
    isSettlement:{type:Number},//是否结清0 初始化 1 未结算 2结算
    createdOn: {type:Date},//创建时间
    createdStr:{type:String},
    createdBy: {type:String},//创建者ID
    modifiedOn: {type:Date},//修改时间
    modifiedBy: {type:String} //修改者ID
});
module.exports = mongoose.model('account', accountSchema);