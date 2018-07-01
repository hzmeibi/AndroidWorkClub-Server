/**
 * Created by vicky on 18/5/17.
 */
var mongoose = require('../database/mongodb');  //链接数据库
var accountSchema =  new mongoose.Schema({
    blogName: {type: String,required:true}, //名称
    blogType:{type: String},
    description:{type:String},//描述
    blogPic:{type: String},//图片地址
    keyWords: {type: String},//
    blogContent:{type:String},//
    visitCount:{type: Number,default:0},
    isDelete:{type:Boolean,default: false},
    isActive:{type:Boolean,default: true},
    createdOn: {type:Date},//创建时间
    createdBy: {type:String},//创建者ID
    modifiedOn: {type:Date},//修改时间
    modifiedBy: {type:String} //修改者ID
});
module.exports = mongoose.model('blog', accountSchema);