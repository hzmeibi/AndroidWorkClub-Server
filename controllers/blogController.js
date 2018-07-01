/**
 * Created by vicky on 18/5/17.
 */
var blogModel = require('../models/blogModel');
var fs = require('fs');
var async = require('async');
var moment = require('moment');
var multiparty = require('multiparty');
var util = require('util');

exports.insertBlogs = function (req, res) {
    console.log(req.body)
    if (!req.body || !req.body.blogName || !req.body.description || !req.body.blogContent) {
        return res.send({status: 401, msg: '缺少参数'})
    }
    var blog = new blogModel();
    blog.blogName = req.body.blogName;
    blog.description = req.body.description;
    blog.blogType = req.body.blogType;
    blog.keyWords = req.body.keyWords;
    blog.blogContent = req.body.blogContent;
    blog.visitCount = req.body.visitCount;
    blog.keyWords = req.body.keyWords;
    blog.blogPic = req.body.blogPic;
    blog.createdOn = new Date();
    blog.createdBy = 'Vicky'

    blog.save(function (err, reply) {
        if (err) {
            console.log(err)
            return res.send({status: 402, msg: '新增出错'})
        } else {
            return res.send({status: 200, msg: '成功'})
        }
    });
}

/**
 * 获取blogs
 * @param req
 * @param res
 */
exports.getBlogList =function (req,res) {
    blogModel.find({}, function (err, reply) {
        if (err) {
            return res.send({status: 403, msg: '查找出错啦'});
        } else {
            return res.send({status: 200, msg: '成功', info: reply});
        }
    }).sort({"_id":-1});
}
exports.searchBlogByType = function(req,res){
    if (!req.body.blogType) {
        return res.send({status: 401, msg: '缺少参数'})
    }
    blogModel.find({blogType:req.body.blogType}, function (err, reply) {
        if (err) {
            return res.send({status: 403, msg: '查找出错啦'});
        } else {
            return res.send({status: 200, msg: '成功', info: reply});
        }
    }).sort({"_id":-1});
}

exports.delBlogs= function (req, res, next) {

    if (!req.body.blogsId) {
        return res.send({status: 401, msg: '缺少参数'})
    }

    var blogsId = req.body.blogsId;
    blogModel.remove({_id: blogsId}, function (err, result) {
        if (err) {
            return res.send({status: 403, msg: '删除出错啦'});
        } else {
            return res.send({status: 200, msg: '删除成功', info: ''});
        }
    });
}

/***
 * 实现文件上传
 * @param req
 * @param res
 */

exports.uploadFiles = function (req,res) {
    console.log(req.body);
    console.log(req.files);

    // var imgData = req.body.url;
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = new Buffer(base64Data, 'base64');
    // fs.writeFile("image.png", dataBuffer, function(err) {
    //     if(err){
    //         res.send(err);
    //     }else{
    //         res.send("保存成功！");
    //     }
    // });
}